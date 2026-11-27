import { useCallback, useEffect, useState } from "react";
import { TaskDTO } from "@taskflow/shared";
import { fetchTasksForProject } from "../api/tasksApi";

export interface UseTasksResult {
  items: TaskDTO[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Load and keep a project's task list in sync. */
export function useTasks(projectId: string): UseTasksResult {
  const [items, setItems] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const refetch = useCallback(() => {
    setRefreshToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchTasksForProject(projectId)
      .then((result) => {
        if (!cancelled) setItems(result);
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
  }, [projectId, refreshToken]);

  return { items, loading, error, refetch };
}
