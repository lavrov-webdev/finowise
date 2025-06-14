import { createLazyFileRoute } from "@tanstack/react-router";
import { Dashboard as DashboardComponent } from "../../modules/dashboard";


export const Route = createLazyFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return <DashboardComponent />;
}; 