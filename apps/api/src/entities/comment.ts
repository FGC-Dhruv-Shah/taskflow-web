/** A comment left on a task. */
export class Comment {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date;

  constructor(params: { id: string; taskId: string; authorId: string; body: string }) {
    this.id = params.id;
    this.taskId = params.taskId;
    this.authorId = params.authorId;
    this.body = params.body;
    this.createdAt = new Date();
  }

  toDict() {
    return {
      id: this.id,
      taskId: this.taskId,
      authorId: this.authorId,
      body: this.body,
    };
  }
}
