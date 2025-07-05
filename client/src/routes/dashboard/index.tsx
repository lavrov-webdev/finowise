import { createFileRoute } from "@tanstack/react-router";
import { Dashboard as DashboardComponent } from "../../modules/dashboard";
import { z } from "zod";

const dashboardSearchSchema = z.object({
  sprintId: z.number().optional(),
  categoryId: z.number().optional(),
});

export type DashboardSearchParams = z.infer<typeof dashboardSearchSchema>;

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
  validateSearch: dashboardSearchSchema,
});

function Dashboard() {
  return <DashboardComponent />;
}; 