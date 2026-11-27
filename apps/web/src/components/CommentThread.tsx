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

  return (
    <div className="comment-thread">
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button onClick={submit}>Post</button>
    </div>
  );
}
