import { appAxios } from "@system/axios";
import { GetEnvelopeDto, TEditEnvelopeDtoOut } from "../../types";

export const editEnvelope = async (envelope: TEditEnvelopeDtoOut) => {
  const { data } = await appAxios.patch(`envelopes/${envelope.id}`, {
    amount: envelope.amount,
  });
  return GetEnvelopeDto.parse(data);
};
