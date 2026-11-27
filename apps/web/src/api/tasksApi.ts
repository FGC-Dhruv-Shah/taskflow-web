import { TaskDTO } from "@taskflow/shared";
import { apiGet, apiPost } from "./client";

export function fetchTasksForProject(projectId: string): Promise<TaskDTO[]> {
  return apiGet<TaskDTO[]>(`/projects/${projectId}/tasks`);
}

export function createTask(projectId: string, title: string, estimateHours: number): Promise<TaskDTO> {
  return apiPost<TaskDTO>("/tasks", { projectId, title, estimateHours });
}

export function assignTask(taskId: string, userId: string): Promise<TaskDTO> {
  return apiPost<TaskDTO>(`/tasks/${taskId}/assign`, { userId });
}

export function completeTask(taskId: string): Promise<TaskDTO> {
  return apiPost<TaskDTO>(`/tasks/${taskId}/complete`, {});
}
