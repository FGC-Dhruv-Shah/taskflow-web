import { Router } from "express";
import { CommentRepository } from "../repositories/commentRepository";
import { CommentService } from "../services/commentService";

export const commentRoutes = Router();
const commentService = new CommentService(new CommentRepository());

commentRoutes.post("/comments", (req, res) => {
  const { taskId, authorId, body } = req.body;
  const comment = commentService.addComment(taskId, authorId, body);
  res.json(comment.toDict());
});

commentRoutes.delete("/comments/:commentId", (req, res) => {
  commentService.deleteComment(req.params.commentId);
  res.status(204).send();
});
