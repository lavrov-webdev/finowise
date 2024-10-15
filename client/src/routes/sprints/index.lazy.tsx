import { SprintsList } from "@modules/Sprints";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sprints/")({
  component: () => <SprintsList />,
});
