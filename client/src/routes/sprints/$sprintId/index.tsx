import { DetailSprint, getSprintByIdQueryOptions } from "@modules/Sprints";
import { queryClient } from "@system/queryClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sprints/$sprintId/")({
  loader: (route) =>
    queryClient.ensureQueryData(
      getSprintByIdQueryOptions(+route.params.sprintId),
    ),
  component: Component,
});

function Component() {
  const params = Route.useParams();
  return <DetailSprint sprintId={+params.sprintId} />;
}
