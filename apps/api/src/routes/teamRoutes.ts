import { Router } from "express";
import { TeamRepository } from "../repositories/teamRepository";
import { NotificationService } from "../services/notificationService";
import { TeamService } from "../services/teamService";

export const teamRoutes = Router();
const teamService = new TeamService(new TeamRepository(), new NotificationService());

teamRoutes.post("/teams", (req, res) => {
  const { name, ownerId } = req.body;
  const team = teamService.createTeam(name, ownerId);
  res.json(team.toDict());
});

teamRoutes.post("/teams/:teamId/members", (req, res) => {
  const team = teamService.addMember(req.params.teamId, req.body.userId);
  res.json(team.toDict());
});

teamRoutes.delete("/teams/:teamId/members/:userId", (req, res) => {
  const team = teamService.removeMember(req.params.teamId, req.params.userId);
  res.json(team.toDict());
});
