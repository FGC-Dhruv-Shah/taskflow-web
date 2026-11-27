import { Router } from "express";
import { ProjectRepository } from "../repositories/projectRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { NotificationService } from "../services/notificationService";
import { ProjectService } from "../services/projectService";

export const projectRoutes = Router();
const projectService = new ProjectService(new ProjectRepository(), new TaskRepository(), new NotificationService());

projectRoutes.post("/projects", (req, res) => {
  const { name, budget, ownerId } = req.body;
  const project = projectService.createProject(name, budget, ownerId);
  res.json(project.toDict());
});

projectRoutes.post("/projects/:projectId/archive", (req, res) => {
  const cascade = req.body.cascade ?? true;
  const project = projectService.archiveProject(req.params.projectId, cascade);
  res.json(project.toDict());
});

projectRoutes.get("/projects/:projectId/history", (req, res) => {
  res.json(projectService.getProjectHistory(req.params.projectId));
});

projectRoutes.patch("/projects/:projectId/budget", (req, res) => {
  const project = projectService.updateBudget(req.params.projectId, req.body.newBudget);
  res.json(project.toDict());
});
