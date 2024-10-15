import { CreateSprintForm } from "@modules/Sprints";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/sprints/create/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <CreateSprintForm />
    </div>
  );
}
