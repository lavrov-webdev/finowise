import { GetSprintDto, TEditSprintDtoOutput } from "@modules/Sprints/types";
import { appAxios } from "@system/axios";

export const editSprint = async ({
  editSprintDto,
  id,
}: {
  editSprintDto: TEditSprintDtoOutput;
  id: number;
}) => {
  const { data } = await appAxios.patch(`/sprints/${id}`, editSprintDto);
  return GetSprintDto.parse(data);
};
