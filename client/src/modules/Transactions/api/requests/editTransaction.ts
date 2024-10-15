import {
  GetTransactionDto,
  TEditTransactionDtoOut,
} from "@modules/Transactions/types";
import { appAxios } from "@system/axios";

export const editTransaction = async ({
  editTransaction,
  id,
}: {
  editTransaction: TEditTransactionDtoOut;
  id: number;
}) => {
  const { data } = await appAxios.patch("/transactions/" + id, editTransaction);
  return GetTransactionDto.parse(data);
};
