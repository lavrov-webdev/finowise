import { atom } from "jotai";

export const categoriesToDeleteAtom = atom<Set<number>>(new Set([]));
