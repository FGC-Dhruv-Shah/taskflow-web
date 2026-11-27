import {
  formatCurrency,
  formatTimestamp,
  normalizeText,
  slugify,
  validateProjectName,
  ValidationError,
} from "@taskflow/shared";
import { Project } from "../entities/project";
import { ProjectRepository } from "../repositories/projectRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { NotificationService } from "./notificationService";

/** Orchestrates project creation, budgeting, and archival. */
export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private taskRepository: TaskRepository,
    private notificationService: NotificationService
  ) {}

  createProject(name: string, budget: number, ownerId: string): Project {
    const cleanName = normalizeText(name);
    if (cleanName.length === 0) {
      throw new ValidationError("Project name cannot be empty");
    }
    validateProjectName(cleanName);
    const project = new Project({
      id: this.projectRepository.newId(),
      name: cleanName,
      slug: slugify(cleanName),
      ownerId,
      budget,
    });
    return this.projectRepository.create(project);
  }

  updateBudget(projectId: string, newBudget: number): Project {
    const project = this.projectRepository.update(projectId, { budget: newBudget });
    console.log(`Project ${projectId} budget updated to ${formatCurrency(newBudget, project.currency)}`);
    return project;
  }

  /**
   * Archive a project and, when `cascade` is set, archive its open tasks
   * too. The cascade step is best-effort: a task that fails to update is
   * logged and skipped rather than aborting the whole archival.
   */
  archiveProject(projectId: string, cascade: boolean = true): Project {
    const project = this.projectRepository.get(projectId);
    if (project.isArchived) {
      return project;
    }
    if (cascade) {
      const openTasks = this.taskRepository
        .listByProject(projectId)
        .filter((t) => t.status !== "completed" && t.status !== "archived");
      for (const task of openTasks) {
        try {
          this.taskRepository.updateTaskStatus(task.id, "archived");
        } catch (err) {
          console.error(`Failed to archive task ${task.id}, continuing`, err);
        }
      }
    }
    const archived = this.projectRepository.update(projectId, { isArchived: true });
    this.notificationService.notifyProjectMembers(
      projectId,
      `Project '${project.name}' was archived at ${formatTimestamp(new Date())}`
    );
    return archived;
  }

  /**
   * Return a project's current state, including deleted/archived ones.
   * Deletion in this system is soft: a deleted project's id still resolves
   * here so audit and reporting views can show what happened to it.
   */
  getProjectHistory(projectId: string): Record<string, unknown> {
    const project = this.projectRepository.get(projectId);
    return {
      project: project.toDict(),
      status: project.isDeleted ? "deleted" : project.isArchived ? "archived" : "active",
    };
  }
}
