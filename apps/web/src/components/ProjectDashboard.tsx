import React from "react";
import { useProject } from "../hooks/useProjects";
import { TaskList } from "./TaskList";

export interface ProjectDashboardProps {
  projectId: string;
}

export function ProjectDashboard({ projectId }: ProjectDashboardProps) {
  const { project, loading } = useProject(projectId);

  if (loading || !project) return <p>Loading project...</p>;

  return (
    <section className="project-dashboard">
      <h2>{project.name}</h2>
      <p>
        Budget: {project.budget} {project.currency}
      </p>
      <TaskList projectId={projectId} />
    </section>
  );
}
