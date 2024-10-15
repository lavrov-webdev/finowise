import { TAuthDto } from "@modules/Auth/types";
import { appAxios } from "@system/axios";

export const signIn = (data: TAuthDto) => appAxios.post("/auth/login", data);
