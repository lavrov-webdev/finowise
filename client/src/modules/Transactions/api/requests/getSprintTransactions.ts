import { GetTransactionsWithCategoryName } from "@modules/Transactions/types";
import { appAxios } from "@system/axios";
import { z } from "zod";

export const getSprintTransactions = async (sprintId: number) => {
  const { data } = await appAxios.get(`/transactions/${sprintId}`);
  return z.array(GetTransactionsWithCategoryName).parse(data);
};
