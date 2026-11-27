import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

export const userRoutes = Router();
const userService = new UserService(new UserRepository());

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
