import {
  GetSprintWithEnvelopesDto,
  TCreateSprintDto,
  TGetSprintWithEnvelopesDto,
} from "@modules/Sprints/types";
import { appAxios } from "@system/axios";

export const createSprint = async (
  createSprintDto: TCreateSprintDto,
): Promise<TGetSprintWithEnvelopesDto> => {
  const { data } = await appAxios.post("/sprints", createSprintDto);
  return GetSprintWithEnvelopesDto.parse(data);
};
