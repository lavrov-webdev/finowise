import { appAxios } from "@system/axios";
import { GetEnvelopesWithCategoryNameAndSprintDates } from "../../types";
import { z } from "zod";

export const getEnvelopesByDate = async (date: string) => {
  const { data } = await appAxios.get(`/envelopes/by_date/${date}`);
  return z.array(GetEnvelopesWithCategoryNameAndSprintDates).parse(data);
};
