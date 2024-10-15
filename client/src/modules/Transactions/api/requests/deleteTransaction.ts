import { GetTransactionDto } from "@modules/Transactions/types";
import { appAxios } from "@system/axios";

export const deleteTransaction = async (id: number) => {
  const { data } = await appAxios.delete("/transactions/" + id);
  return GetTransactionDto.parse(data);
};
