import { UserDrawer } from "./components/UserDrawer";
import { ASIDE_PANEL, TPanelItem } from "./types";

export const PANEL_ITEMS: TPanelItem[] = [
  {
    id: ASIDE_PANEL.settings,
    content: <div>Настройки</div>,
  },
  {
    id: ASIDE_PANEL.user,
    content: <UserDrawer />,
  },
];
