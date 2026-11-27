import React from "react";
import { useTasks } from "../hooks/useTasks";
import { completeTask } from "../api/tasksApi";
import { TaskItem } from "./TaskItem";

export interface TaskListProps {
  projectId: string;
}

export function TaskList({ projectId }: TaskListProps) {
  const { tasks, loading, error } = useTasks(projectId);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Failed to load tasks: {error}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={completeTask} />
      ))}
    </ul>
  );
}
