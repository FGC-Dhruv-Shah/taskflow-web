import React from "react";
import { TaskDTO } from "@taskflow/shared";

export interface TaskItemProps {
  task: TaskDTO;
  onComplete: (taskId: string) => void;
  showEstimate?: boolean;
}

export function TaskItem({ task, onComplete, showEstimate = true }: TaskItemProps) {
  const estimateLabel =
    task.estimateHours > 0 ? `${task.estimateHours.toFixed(1)}h estimated` : "No estimate";
  const statusLabel = task.status.charAt(0).toUpperCase() + task.status.slice(1);

  return (
    <li className="task-item">
      <span>{task.title}</span>
      <span className="task-status" title={task.status}>
        {statusLabel}
      </span>
      {showEstimate && <span className="task-estimate">{estimateLabel}</span>}
      {task.assigneeId ? (
        <span className="task-assignee">Assigned to {task.assigneeId}</span>
      ) : (
        <span className="task-assignee task-assignee--unset">Unassigned</span>
      )}
      {task.status !== "completed" && <button onClick={() => onComplete(task.id)}>Mark complete</button>}
    </li>
  );
}
