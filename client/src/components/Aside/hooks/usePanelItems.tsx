import { useAtom } from "jotai";
import { openedAsidePanelStore } from "../store/openedAsidePanelStore";
import { DrawerItemProps } from "@gravity-ui/navigation";
import { TPanelItem } from "../types";
import styles from "../Aside.module.scss";
import { PANEL_ITEMS } from "../consts";

export const usePanelItems = () => {
  const [openedAsidePanel] = useAtom(openedAsidePanelStore);

  const mapDefaultItem = (item: TPanelItem): DrawerItemProps => {
    return {
      ...item,
      visible: item.id === openedAsidePanel,
      content: <div className={styles.panel}>{item.content}</div>,
    };
  };

  return PANEL_ITEMS.map(mapDefaultItem);
};
