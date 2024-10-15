import {
  GetTransactionDto,
  TCreateTransactionDtoOut,
} from "@modules/Transactions/types";
import { appAxios } from "@system/axios";

export const createTransaction = async (
  transaction: TCreateTransactionDtoOut,
) => {
  const { data } = await appAxios.post("/transactions", transaction);
  return GetTransactionDto.parse(data);
};
