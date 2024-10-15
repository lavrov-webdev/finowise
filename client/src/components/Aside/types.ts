import { DrawerItemProps } from "@gravity-ui/navigation";

export enum ASIDE_PANEL {
  settings = "settings",
  user = "user",
}

export type TPanelItem = Omit<DrawerItemProps, "id" | "visible"> & {
  id: ASIDE_PANEL;
};
