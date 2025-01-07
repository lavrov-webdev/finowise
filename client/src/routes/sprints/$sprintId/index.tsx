import { DetailSprint } from "@modules/Sprints";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sprints/$sprintId/")({
  component: Component,
});

function Component() {
  const params = Route.useParams();
  return <DetailSprint sprintId={+params.sprintId} />;
}
