import React, { useState } from "react";
import { CommentDTO } from "@taskflow/shared";

export interface CommentThreadProps {
  comments: CommentDTO[];
  onAddComment: (body: string) => void;
}

export function CommentThread({ comments, onAddComment }: CommentThreadProps) {
  const [draft, setDraft] = useState("");

  const submit = () => {
    if (!draft.trim()) return;
    onAddComment(draft);
    setDraft("");
  };

  const countLabel = comments.length === 1 ? "1 comment" : `${comments.length} comments`;

  return (
    <div className="comment-thread">
      <h3 className="comment-thread__count">{countLabel}</h3>
      {comments.length === 0 ? (
        <p className="comment-thread__empty">No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}
      <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a comment" />
      <button onClick={submit}>Post</button>
    </div>
  );
}
