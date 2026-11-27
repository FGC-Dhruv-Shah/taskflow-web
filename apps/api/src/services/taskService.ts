import { normalizeText, ValidationError } from "@taskflow/shared";
import { Task } from "../entities/task";
import { TaskRepository } from "../repositories/taskRepository";
import { NotificationService } from "./notificationService";

/** Orchestrates task creation, assignment, and completion. */
export class TaskService {
  constructor(private taskRepository: TaskRepository, private notificationService: NotificationService) {}

  createTask(projectId: string, title: string, estimateHours: number = 0): Task {
    const cleanTitle = normalizeText(title);
    if (cleanTitle.length === 0) {
      throw new ValidationError("Task title cannot be empty");
    }
    const task = new Task({
      id: this.taskRepository.newId(),
      projectId,
      title: cleanTitle,
      estimateHours,
    });
    return this.taskRepository.create(task);
  }

  assignTask(taskId: string, userId: string): Task {
    const task = this.taskRepository.update(taskId, { assigneeId: userId });
    this.notificationService.notifyUser(userId, `You were assigned task '${task.title}'`);
    return task;
  }

  completeTask(taskId: string): Task {
    return this.taskRepository.updateTaskStatus(taskId, "completed");
  }

  /**
   * Convert an estimate in hours into whole minutes, for display purposes.
   * Unrelated to the shared `calculateDuration` (a measured elapsed
   * duration in seconds): this is a display-only conversion of a task's
   * *estimate*.
   */
  calculateDuration(estimateHours: number): number {
    return Math.floor(estimateHours * 60);
  }

  estimateRemainingTime(task: Task, minutesLogged: number): number {
    const totalMinutes = this.calculateDuration(task.estimateHours);
    return Math.max(totalMinutes - minutesLogged, 0);
  }
}
