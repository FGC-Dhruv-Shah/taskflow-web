import { useEffect, useState } from "react";
import { ProjectDTO } from "@taskflow/shared";
import { fetchProject } from "../api/projectsApi";

export interface UseProjectResult {
  project: ProjectDTO | null;
  loading: boolean;
}

/** Load a single project's details. */
export function useProject(projectId: string): UseProjectResult {
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProject(projectId).then((result) => {
      if (!cancelled) {
        setProject(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { project, loading };
}
