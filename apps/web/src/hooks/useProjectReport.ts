import { useEffect, useState } from "react";
import { fetchProjectHistory } from "../api/projectsApi";

export interface UseProjectReportResult {
  history: Record<string, unknown> | null;
  loading: boolean;
}

/** Load a project's archival/deletion history for reporting views. */
export function useProjectReport(projectId: string): UseProjectReportResult {
  const [history, setHistory] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProjectHistory(projectId).then((result) => {
      if (!cancelled) {
        setHistory(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { history, loading };
}
