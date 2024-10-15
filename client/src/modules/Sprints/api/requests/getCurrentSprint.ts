import { TGetSprintDto } from "@modules/Sprints/types";
import { appAxios } from "@system/axios";

export const getCurrentSprint = async (): Promise<
  Pick<TGetSprintDto, "id">
> => {
  const { data } =
    await appAxios.get<Pick<TGetSprintDto, "id">>(`/sprints/current`);
  return data;
};
