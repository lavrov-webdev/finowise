import { GetSprintDto, TGetSprintDto } from "@modules/Sprints/types";
import { appAxios } from "@system/axios";

export const deleteSprint = async (id: number): Promise<TGetSprintDto> => {
  const { data } = await appAxios.delete(`/sprints/${id}`);
  return GetSprintDto.parse(data);
};
