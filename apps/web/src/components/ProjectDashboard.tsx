import React from "react";
import { formatCurrency } from "@taskflow/shared";
import { useProject } from "../hooks/useProjects";
import { TaskList } from "./TaskList";

export interface ProjectDashboardProps {
  projectId: string;
}

export function ProjectDashboard({ projectId }: ProjectDashboardProps) {
  const { project, loading, refetch } = useProject(projectId);

  if (loading) return <p className="project-dashboard__status">Loading project...</p>;
  if (!project) return <p className="project-dashboard__status">Project not found.</p>;

  return (
    <section className="project-dashboard">
      <header className="project-dashboard__header">
        <h2>{project.name}</h2>
        <button onClick={refetch}>Refresh</button>
      </header>
      <p>Budget: {formatCurrency(project.budget, project.currency)}</p>
      <p className="project-dashboard__slug">Slug: {project.slug}</p>
      {project.isArchived && <p className="project-dashboard__archived">This project is archived.</p>}
      <TaskList projectId={projectId} />
    </section>
  );
}
