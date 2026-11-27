export class TaskFlowError extends Error {}

export class ValidationError extends TaskFlowError {}

export class NotFoundError extends TaskFlowError {}

export class ConflictError extends TaskFlowError {}
