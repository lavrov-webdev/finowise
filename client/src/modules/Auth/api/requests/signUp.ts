import { TAuthDto } from "@modules/Auth/types";
import { appAxios } from "@system/axios";

export const signUp = (data: TAuthDto) => {
  return appAxios.post("/auth/create", data);
};
