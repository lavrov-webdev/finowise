import { atom } from "jotai";
import { ASIDE_PANEL } from "../types";

export const openedAsidePanelStore = atom<ASIDE_PANEL | null>(null);
