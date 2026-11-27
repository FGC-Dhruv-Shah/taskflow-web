import { ProjectRepository } from "../repositories/projectRepository";
import { TaskRepository } from "../repositories/taskRepository";

/** Aggregates overdue tasks across every project an owner holds. */
export class ReminderDigestService {
  constructor(private projectRepository: ProjectRepository, private taskRepository: TaskRepository) {}

  buildDigest(ownerId: string, asOf: Date): Record<string, unknown> {
    const projects = this.projectRepository.listForOwner(ownerId);
    const perProject: Record<string, number> = {};
    for (const project of projects) {
      perProject[project.id] = this.taskRepository.countOverdue(project.id, asOf);
    }
    const totalOverdue = Object.values(perProject).reduce((sum, count) => sum + count, 0);
    return { ownerId, projects: perProject, totalOverdue };
  }
}
