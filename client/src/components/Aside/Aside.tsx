import { isAsideCompactStore } from "@components/Aside/store/isAsideCompactStore";
import { Gear, Person } from "@gravity-ui/icons";
import { AsideHeader } from "@gravity-ui/navigation";

import { Link, Outlet } from "@tanstack/react-router";
import { useAtom } from "jotai";
import styles from "./Aside.module.scss";
import { AsideFooterItem } from "./components/AsideFooterItem";
import { useMenuItems } from "./hooks/useMenuItems";
import { usePanelItems } from "./hooks/usePanelItems";
import { openedAsidePanelStore } from "./store/openedAsidePanelStore";
import { ASIDE_PANEL } from "./types";
import { AuthPage, useUserInfo } from "../../modules/Auth";

export const Aside = () => {
  const [isAsideCompact, setIsAsideCompact] = useAtom(isAsideCompactStore);
  const panelItems = usePanelItems();
  const [_, setOpenedAsidePanel] = useAtom(openedAsidePanelStore);
  const userState = useUserInfo();

  const menuItems = useMenuItems();
  return (
    <AsideHeader
      menuItems={menuItems}
      onChangeCompact={() => setIsAsideCompact((p) => !p)}
      compact={isAsideCompact}
      renderContent={() => (
        <div className={styles.main}>
          {userState.data?.id ? <Outlet /> : <AuthPage />}
        </div>
      )}
      logo={{
        text: "Finowise 💸",
        wrapper(node) {
          return (
            <Link to="/" className={styles.headerLink}>
              {node}
            </Link>
          );
        },
      }}
      onClosePanel={() => setOpenedAsidePanel(null)}
      panelItems={panelItems}
      renderFooter={() => (
        <>
          <AsideFooterItem
            id={ASIDE_PANEL.settings}
            title="Настройки"
            icon={Gear}
          />
          <AsideFooterItem
            id={ASIDE_PANEL.user}
            title="Пользователь"
            icon={Person}
          />
        </>
      )}
    />
  );
};
