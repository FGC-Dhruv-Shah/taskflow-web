import { normalizeText, ValidationError } from "@taskflow/shared";
import { Task } from "../entities/task";
import { TaskRepository } from "../repositories/taskRepository";
import { NotificationService } from "./notificationService";

export class TaskReminderError extends Error {}

/** Orchestrates task creation, assignment, and completion. */
export class TaskService {
  constructor(private taskRepository: TaskRepository, private notificationService: NotificationService) {}

  createTask(projectId: string, title: string, estimateHours: number = 0, dueDate: Date | null = null): Task {
    const cleanTitle = normalizeText(title);
    if (cleanTitle.length === 0) {
      throw new ValidationError("Task title cannot be empty");
    }
    const task = new Task({
      id: this.taskRepository.newId(),
      projectId,
      title: cleanTitle,
      estimateHours,
      dueDate,
    });
    return this.taskRepository.create(task);
  }

  /** Return a project's tasks that are overdue as of `asOf`. */
  getOverdueTasks(projectId: string, asOf: Date): Task[] {
    return this.taskRepository.listOverdue(projectId, asOf);
  }

  /** Send an assignee reminder for an overdue task and mark it sent. */
  sendReminder(taskId: string): Task {
    let task: Task;
    try {
      task = this.taskRepository.get(taskId);
    } catch (err) {
      if (err instanceof TaskReminderError) {
        throw new TaskReminderError(`Task ${taskId} not found`);
      }
      throw err;
    }
    if (task.assigneeId) {
      this.notificationService.notifyUser(task.assigneeId, `Reminder: '${task.title}' is overdue`);
    }
    task.markReminderSent();
    return this.taskRepository.update(taskId, { reminderSent: true } as Partial<Task>);
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
