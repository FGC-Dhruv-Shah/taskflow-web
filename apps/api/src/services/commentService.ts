import { ValidationError } from "@taskflow/shared";
import { Comment } from "../entities/comment";
import { CommentRepository } from "../repositories/commentRepository";

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Orchestrates comment creation and relative-time display formatting. */
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  addComment(taskId: string, authorId: string, body: string): Comment {
    if (!body || !body.trim()) {
      throw new ValidationError("Comment body cannot be empty");
    }
    const comment = new Comment({
      id: this.commentRepository.newId(),
      taskId,
      authorId,
      body: body.trim(),
    });
    return this.commentRepository.create(comment);
  }

  deleteComment(commentId: string): void {
    this.commentRepository.delete(commentId);
  }

  /**
   * Render `date` as a relative time for display, e.g. `'3 hours ago'`.
   * Deliberately separate from the shared `formatTimestamp` (an absolute
   * ISO string for audit logs): display and audit formatting have
   * different needs, so this is its own local helper.
   */
  formatTimestamp(date: Date): string {
    const elapsed = (Date.now() - date.getTime()) / 1000;
    if (elapsed < MINUTE) return "just now";
    if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} minutes ago`;
    if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)} hours ago`;
    return `${Math.floor(elapsed / DAY)} days ago`;
  }
}
