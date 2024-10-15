import { Alert } from "@gravity-ui/uikit";
import {
  DetailSpritnLoader,
  getCurrentSprintQueryOptions,
  getSprintByIdQueryOptions,
} from "@modules/Sprints";
import { queryClient } from "@system/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/sprints/current/")({
  loader: async () => {
    const t = await queryClient.ensureQueryData(getCurrentSprintQueryOptions());
    queryClient.ensureQueryData(getSprintByIdQueryOptions(t.id));
  },
  component: Component,
});

function Component() {
  const currentSprint = useQuery(getCurrentSprintQueryOptions());
  const sprintId = useMemo(
    () => currentSprint.data?.id?.toString(),
    [currentSprint.data],
  );
  const navigate = Route.useNavigate();
  if (typeof sprintId === "undefined") {
    return (
      <Alert
        title="Пусто"
        theme="warning"
        layout="horizontal"
        message="На сегодня у Вас нет активных спринтов"
        actions={
          <Alert.Action onClick={() => navigate({ to: "/sprints/create" })}>
            Создать
          </Alert.Action>
        }
      />
    );
  }
  return currentSprint.isLoading ? (
    <DetailSpritnLoader />
  ) : (
    <Navigate to="/sprints/$sprintId" params={{ sprintId }} />
  );
}
