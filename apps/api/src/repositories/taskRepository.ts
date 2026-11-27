import { calculateDuration } from "@taskflow/shared";
import { Task } from "../entities/task";
import { BaseRepository } from "./baseRepository";

interface TimeEntry {
  start: Date;
  end: Date;
  durationSeconds: number;
}

/** CRUD for tasks, with project-scoped lookups and time logging. */
export class TaskRepository extends BaseRepository<Task> {
  private timeEntries = new Map<string, TimeEntry[]>();

  listByProject(projectId: string): Task[] {
    return this.listAll().filter((t) => t.projectId === projectId);
  }

  /** Return a project's tasks whose due date has passed. */
  listOverdue(projectId: string, asOf: Date): Task[] {
    return this.listByProject(projectId).filter((t) => t.isOverdue(asOf));
  }

  countOverdue(projectId: string, asOf: Date): number {
    return this.listOverdue(projectId, asOf).length;
  }

  /** Return a project's open tasks due within `withinHours` of `asOf`. */
  listDueSoon(projectId: string, asOf: Date, withinHours: number = 24): Task[] {
    const horizon = new Date(asOf.getTime() + withinHours * 60 * 60 * 1000);
    return this.listByProject(projectId).filter(
      (t) => t.dueDate !== null && t.status !== "completed" && t.dueDate >= asOf && t.dueDate <= horizon
    );
  }

  /** Set `status` on the task and persist it in a single call. */
  updateTaskStatus(taskId: string, status: string): Task {
    return this.update(taskId, { status, updatedAt: new Date() } as Partial<Task>);
  }

  /** Record a worked time entry for `taskId` and return its duration in seconds. */
  logTimeEntry(taskId: string, start: Date, end: Date): number {
    const durationSeconds = calculateDuration(start, end);
    const entries = this.timeEntries.get(taskId) ?? [];
    entries.push({ start, end, durationSeconds });
    this.timeEntries.set(taskId, entries);
    return durationSeconds;
  }

  totalLoggedSeconds(taskId: string): number {
    const entries = this.timeEntries.get(taskId) ?? [];
    return entries.reduce((sum, entry) => sum + entry.durationSeconds, 0);
  }
}
