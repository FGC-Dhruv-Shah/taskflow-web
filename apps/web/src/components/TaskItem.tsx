import React from "react";
import { TaskDTO } from "@taskflow/shared";

export interface TaskItemProps {
  task: TaskDTO;
  onComplete: (taskId: string) => void;
  highlightOverdue?: boolean;
}

export function TaskItem({ task, onComplete, highlightOverdue = false }: TaskItemProps) {
  const estimateLabel =
    task.estimateHours > 0 ? `${task.estimateHours.toFixed(1)}h estimated` : "No estimate";
  const className = highlightOverdue ? "task-item task-item--overdue" : "task-item";

  return (
    <li className={className}>
      <span>{task.title}</span>
      <span className="task-status">{task.status}</span>
      <span className="task-estimate">{estimateLabel}</span>
      {task.assigneeId ? (
        <span className="task-assignee">Assigned to {task.assigneeId}</span>
      ) : (
        <span className="task-assignee task-assignee--unset">Unassigned</span>
      )}
      {task.status !== "completed" && <button onClick={() => onComplete(task.id)}>Mark complete</button>}
    </li>
  );
}
