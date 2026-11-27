/** A unit of work belonging to a project. */
export class Task {
  id: string;
  projectId: string;
  title: string;
  status: string;
  assigneeId: string | null;
  estimateHours: number;
  dueDate: Date | null;
  reminderSent: boolean;
  updatedAt: Date;
  createdAt: Date;

  constructor(params: {
    id: string;
    projectId: string;
    title: string;
    status?: string;
    assigneeId?: string | null;
    estimateHours?: number;
    dueDate?: Date | null;
  }) {
    this.id = params.id;
    this.projectId = params.projectId;
    this.title = params.title;
    this.status = params.status ?? "open";
    this.assigneeId = params.assigneeId ?? null;
    this.estimateHours = params.estimateHours ?? 0;
    this.dueDate = params.dueDate ?? null;
    this.reminderSent = false;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  isOverdue(asOf: Date): boolean {
    if (this.dueDate === null || this.status === "completed") {
      return false;
    }
    return this.dueDate.getTime() < asOf.getTime();
  }

  markReminderSent(): void {
    this.reminderSent = true;
  }

  toDict() {
    return {
      id: this.id,
      projectId: this.projectId,
      title: this.title,
      status: this.status,
      assigneeId: this.assigneeId,
      dueDate: this.dueDate ? this.dueDate.toISOString() : null,
      reminderSent: this.reminderSent,
    };
  }
}
