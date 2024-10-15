import { openedAsidePanelStore } from "@components/Aside/store/openedAsidePanelStore";
import { ASIDE_PANEL } from "@components/Aside/types";
import { FooterItem, MenuItem } from "@gravity-ui/navigation";
import { useAtom } from "jotai";
import { FC } from "react";

type Props = Omit<MenuItem, "id" | "itemWrapper"> & {
  id: ASIDE_PANEL;
};
export const AsideFooterItem: FC<Props> = ({ id, ...item }) => {
  const [openedAsidePanel, setOpenedAsidePanel] = useAtom(
    openedAsidePanelStore,
  );
  const isVisible = openedAsidePanel === id;
  const onItemClick = () => setOpenedAsidePanel(isVisible ? null : id);

  return (
    <FooterItem
      compact={isVisible}
      item={{
        ...item,
        onItemClick,
        id,
      }}
    />
  );
};
