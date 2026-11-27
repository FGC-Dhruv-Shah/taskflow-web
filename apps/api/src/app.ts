import express from "express";
import { commentRoutes } from "./routes/commentRoutes";
import { projectRoutes } from "./routes/projectRoutes";
import { taskRoutes } from "./routes/taskRoutes";
import { teamRoutes } from "./routes/teamRoutes";
import { userRoutes } from "./routes/userRoutes";

export const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.use(commentRoutes);
app.use(teamRoutes);
