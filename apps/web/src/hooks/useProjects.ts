import { useCallback, useEffect, useState } from "react";
import { ProjectDTO } from "@taskflow/shared";
import { fetchProject } from "../api/projectsApi";

export interface UseProjectResult {
  project: ProjectDTO | null;
  loading: boolean;
  refetch: () => void;
}

/** Load a single project's details. */
export function useProject(projectId: string): UseProjectResult {
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshToken, setRefreshToken] = useState(0);

  const refetch = useCallback(() => {
    setRefreshToken((token) => token + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProject(projectId).then((result) => {
      if (!cancelled) {
        setProject(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId, refreshToken]);

  return { project, loading, refetch };
}
