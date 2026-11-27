import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { AuditService } from "../services/auditService";
import { UserService } from "../services/userService";

export const userRoutes = Router();
const userService = new UserService(new UserRepository(), new AuditService());

userRoutes.post("/users/register", (req, res) => {
  const { name, email, password } = req.body;
  const user = userService.registerUser(name, email, password);
  res.json(user.toDict());
});

userRoutes.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = userService.authenticateUser(email, password);
  res.json(user.toDict());
});

userRoutes.patch("/users/:userId", (req, res) => {
  const user = userService.updateProfile(req.params.userId, req.body.name);
  res.json(user.toDict());
});

userRoutes.post("/users/:userId/deactivate", (req, res) => {
  const user = userService.deactivateUser(req.params.userId);
  res.json(user.toDict());
});

userRoutes.post("/users/:userId/reactivate", (req, res) => {
  const user = userService.reactivateUser(req.params.userId);
  res.json(user.toDict());
});
