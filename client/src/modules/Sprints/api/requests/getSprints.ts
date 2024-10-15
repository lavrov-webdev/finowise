import {
  GetSprintWithTotalSpendingsAndPlainDto,
  TGetSprintWithTotalSpendingsAndPlainDto,
} from "@modules/Sprints/types";
import { appAxios } from "@system/axios";
import { z } from "zod";

export const getSprints = async (): Promise<
  TGetSprintWithTotalSpendingsAndPlainDto[]
> => {
  const { data } = await appAxios.get("/sprints");
  return z.array(GetSprintWithTotalSpendingsAndPlainDto).parse(data);
};
