import {
  SprintResponse__Envelopes_Transactions_CurrentBalanceDto,
  TGetSprintWithEnvelopesAndTransactionsDto,
} from "@modules/Sprints/types";
import { appAxios } from "@system/axios";

export const getSprintById = async (
  id: number,
): Promise<TGetSprintWithEnvelopesAndTransactionsDto> => {
  const { data } =
    await appAxios.get<TGetSprintWithEnvelopesAndTransactionsDto>(
      `/sprints/${id}`,
    );
  return SprintResponse__Envelopes_Transactions_CurrentBalanceDto.parse(data);
};
