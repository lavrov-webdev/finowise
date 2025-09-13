import { createFileRoute } from "@tanstack/react-router";
import { Dashboard as DashboardComponent } from "@modules/Dashboard";
import { z } from "zod";
import { useEffect } from "react";

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
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return <DashboardComponent />;
}
