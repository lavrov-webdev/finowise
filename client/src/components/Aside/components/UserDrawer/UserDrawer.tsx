import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Button, Flex, Icon, Loader } from "@gravity-ui/uikit";
import { useLogout, useUserInfo } from "@modules/Auth";

export const UserDrawer = () => {
  const userInfoState = useUserInfo();
  const logoutMutation = useLogout();
  if (userInfoState.isLoading) {
    return <Loader />;
  }

  if (!userInfoState.data?.id) {
    return <div>Вы не авторизованы</div>;
  }
  return (
    <Flex
      direction="column"
      gap={4}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <div>
        <b>Id</b> - {userInfoState.data.id}
      </div>
      <div>
        <b>Email</b> - {userInfoState.data.email}
      </div>
      <Button view="outlined-danger" onClick={() => logoutMutation.mutate()}>
        Выйти <Icon data={ArrowRightFromSquare} />
      </Button>
    </Flex>
  );
};
