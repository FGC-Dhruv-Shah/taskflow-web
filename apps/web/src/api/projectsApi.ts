import { ProjectDTO } from "@taskflow/shared";
import { apiGet, apiPatch, apiPost } from "./client";

export function fetchProject(projectId: string): Promise<ProjectDTO> {
  return apiGet<ProjectDTO>(`/projects/${projectId}`);
}

export function fetchProjectHistory(projectId: string): Promise<Record<string, unknown>> {
  return apiGet<Record<string, unknown>>(`/projects/${projectId}/history`);
}

export function createProject(name: string, budget: number, ownerId: string): Promise<ProjectDTO> {
  return apiPost<ProjectDTO>("/projects", { name, budget, ownerId });
}

export function updateProjectBudget(projectId: string, newBudget: number): Promise<ProjectDTO> {
  return apiPatch<ProjectDTO>(`/projects/${projectId}/budget`, { newBudget });
}

export function archiveProject(projectId: string, cascade: boolean): Promise<ProjectDTO> {
  return apiPost<ProjectDTO>(`/projects/${projectId}/archive`, { cascade });
}

export function fetchProjectsForOwner(ownerId: string): Promise<ProjectDTO[]> {
  return apiGet<ProjectDTO[]>(`/owners/${ownerId}/projects`);
}
