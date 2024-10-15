import { Alert } from "@gravity-ui/uikit";
import { useNavigate } from "@tanstack/react-router";

export const EmptyList = () => {
  const navigate = useNavigate();
  return (
    <Alert
      theme="warning"
      title="Пусто"
      message="Пока у Вас нет спринтов"
      layout="horizontal"
      actions={
        <Alert.Action onClick={() => navigate({ to: "/sprints/create" })}>
          Создать
        </Alert.Action>
      }
    />
  );
};
