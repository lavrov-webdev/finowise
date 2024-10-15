import { TGetEnvelopeWithTransactionsDto } from "@modules/Envelopes";
import { useMemo } from "react";

export const useSelectedEnvelopeTransactions = (
  envelopes: TGetEnvelopeWithTransactionsDto[],
  selectedEnvelopeId: number | null,
) => {
  return useMemo(() => {
    if (selectedEnvelopeId === null) {
      return [];
    }
    return (
      envelopes.find((envelope) => envelope.id === selectedEnvelopeId)
        ?.transactions || []
    );
  }, [envelopes, selectedEnvelopeId]);
};
