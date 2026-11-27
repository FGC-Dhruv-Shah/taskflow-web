import React from "react";
import { TaskDTO } from "@taskflow/shared";

export interface TaskItemProps {
  task: TaskDTO;
  onComplete: (taskId: string) => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <li className="task-item">
      <span>{task.title}</span>
      <span className="task-status">{task.status}</span>
      {task.status !== "completed" && <button onClick={() => onComplete(task.id)}>Mark complete</button>}
    </li>
  );
}
