import { UserDto } from "@modules/Auth/types";
import { appAxios } from "@system/axios";
import { AxiosError } from "axios";

export const userInfo = async () => {
  try {
    const { data } = await appAxios.get("/users/me");
    return UserDto.parse(data);
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    if (typeof status === "undefined") {
      return null;
    }
    if (status >= 400 && status < 500) {
      return null;
    }
    throw err;
  }
};
