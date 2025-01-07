import { openedAsidePanelStore } from "@components/Aside/store/openedAsidePanelStore";
import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Button, Flex, Icon, Loader } from "@gravity-ui/uikit";
import { useLogout, useUserInfo } from "@modules/Auth";
import { useAtom } from "jotai";

export const UserDrawer = () => {
  const userInfoState = useUserInfo();
  const logoutMutation = useLogout();
  const [_, setOpenedAsidePanel] = useAtom(openedAsidePanelStore);
  const onLogout = async () => {
    await logoutMutation.mutateAsync()
    setOpenedAsidePanel(null)
  }
  if (userInfoState.isLoading) {
    return <Loader />;
  }

  if (!userInfoState.data?.data?.id) {
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
        <b>Id</b> - {userInfoState.data.data?.id}
      </div>
      <div>
        <b>Email</b> - {userInfoState.data.data?.email}
      </div>
      <Button view="outlined-danger" onClick={onLogout}>
        Выйти <Icon data={ArrowRightFromSquare} />
      </Button>
    </Flex>
  );
};
