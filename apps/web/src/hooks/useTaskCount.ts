import { useEffect, useState } from "react";
import { fetchTasksForProject } from "../api/tasksApi";

export interface UseTaskCountResult {
  count: number;
  loading: boolean;
}

/** Return how many tasks a project currently has. */
export function useTaskCount(projectId: string): UseTaskCountResult {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchTasksForProject(projectId).then((tasks) => {
      if (!cancelled) {
        setCount(tasks.length);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { count, loading };
}
