import { Alert } from "@gravity-ui/uikit";
import {
  DetailSpritnLoader,
  getCurrentSprintQueryOptions,
} from "@modules/Sprints";
import { useQuery } from "@tanstack/react-query";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/sprints/current/")({
  component: Component,
});

function Component() {
  const currentSprint = useQuery(getCurrentSprintQueryOptions());
  const sprintId = useMemo(
    () => currentSprint.data?.data?.id?.toString(),
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
