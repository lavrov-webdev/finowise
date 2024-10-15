import { UpdateCategories } from "@modules/Categories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/categories/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <UpdateCategories />
    </div>
  );
}
