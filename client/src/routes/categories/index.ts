import { getCategoriesQueryOptions } from "@modules/Categories";
import { queryClient } from "@system/queryClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories/")({
  loader: () => queryClient.ensureQueryData(getCategoriesQueryOptions()),
});
