/** A unit of work belonging to a project. */
export class Task {
  id: string;
  projectId: string;
  title: string;
  status: string;
  assigneeId: string | null;
  estimateHours: number;
  updatedAt: Date;
  createdAt: Date;

  constructor(params: {
    id: string;
    projectId: string;
    title: string;
    status?: string;
    assigneeId?: string | null;
    estimateHours?: number;
  }) {
    this.id = params.id;
    this.projectId = params.projectId;
    this.title = params.title;
    this.status = params.status ?? "open";
    this.assigneeId = params.assigneeId ?? null;
    this.estimateHours = params.estimateHours ?? 0;
    this.updatedAt = new Date();
    this.createdAt = new Date();
  }

  toDict() {
    return {
      id: this.id,
      projectId: this.projectId,
      title: this.title,
      status: this.status,
      assigneeId: this.assigneeId,
    };
  }
}
