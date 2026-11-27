import React from "react";
import { ProjectDashboard } from "./components/ProjectDashboard";

const DEMO_PROJECT_ID = "demo-project";

export function App() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <ProjectDashboard projectId={DEMO_PROJECT_ID} />
    </main>
  );
}
