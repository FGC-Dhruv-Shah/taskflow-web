import { Router } from "express";
import { TaskRepository } from "../repositories/taskRepository";
import { NotificationService } from "../services/notificationService";
import { TaskService } from "../services/taskService";

export const taskRoutes = Router();
const taskService = new TaskService(new TaskRepository(), new NotificationService());

taskRoutes.post("/tasks", (req, res) => {
  const { projectId, title, estimateHours } = req.body;
  const task = taskService.createTask(projectId, title, estimateHours ?? 0);
  res.json(task.toDict());
});

taskRoutes.post("/tasks/:taskId/assign", (req, res) => {
  const task = taskService.assignTask(req.params.taskId, req.body.userId);
  res.json(task.toDict());
});

taskRoutes.post("/tasks/:taskId/complete", (req, res) => {
  const task = taskService.completeTask(req.params.taskId);
  res.json(task.toDict());
});
