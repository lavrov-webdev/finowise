import { appAxios } from "@system/axios";

export const logout = () => appAxios.post("/auth/logout");
