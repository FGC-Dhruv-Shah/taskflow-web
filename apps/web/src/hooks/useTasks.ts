import { useEffect, useState } from "react";
import { TaskDTO } from "@taskflow/shared";
import { fetchTasksForProject } from "../api/tasksApi";

export interface UseTasksResult {
  tasks: TaskDTO[];
  loading: boolean;
  error: string | null;
}

/** Load and keep a project's task list in sync. */
export function useTasks(projectId: string): UseTasksResult {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTasksForProject(projectId)
      .then((result) => {
        if (!cancelled) setTasks(result);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { tasks, loading, error };
}
