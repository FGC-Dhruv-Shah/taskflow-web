import { ProjectDTO } from "@taskflow/shared";
import { apiGet, apiPatch, apiPost } from "./client";

export function fetchProject(projectId: string): Promise<ProjectDTO> {
  return apiGet<ProjectDTO>(`/projects/${projectId}`);
}

export function createProject(name: string, budget: number, ownerId: string): Promise<ProjectDTO> {
  return apiPost<ProjectDTO>("/projects", { name, budget, ownerId });
}

export function updateProjectBudget(projectId: string, newBudget: number): Promise<ProjectDTO> {
  return apiPatch<ProjectDTO>(`/projects/${projectId}/budget`, { newBudget });
}
