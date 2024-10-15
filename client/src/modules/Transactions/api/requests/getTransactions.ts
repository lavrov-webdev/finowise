import { GetTransactionsWithCategoryName } from "@modules/Transactions/types";
import { appAxios } from "@system/axios";
import { z } from "zod";

export const getTransactions = async () => {
  const { data } = await appAxios.get("/transactions");
  return z.array(GetTransactionsWithCategoryName).parse(data);
};
