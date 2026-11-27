import { Comment } from "../entities/comment";
import { BaseRepository } from "./baseRepository";

/** CRUD for comments, scoped by task. */
export class CommentRepository extends BaseRepository<Comment> {
  listByTask(taskId: string): Comment[] {
    return this.listAll().filter((c) => c.taskId === taskId);
  }
}
