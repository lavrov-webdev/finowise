import { EnvelopeDetailedResponseDto } from "@generated";
import { useMemo } from "react";

export const useSelectedEnvelopeTransactions = (
  envelopes: EnvelopeDetailedResponseDto[],
  selectedEnvelopeId: number | null,
) => {
  return useMemo(() => {
    if (selectedEnvelopeId === null) {
      return [];
    }
    const selectedEnvelope = envelopes.find((envelope) => envelope.id === selectedEnvelopeId)
    if (!selectedEnvelope) {
      return []
    }
    return selectedEnvelope.transactions.map(transaction => ({
      ...transaction,
      category: selectedEnvelope.category
    })) || []
  }, [envelopes, selectedEnvelopeId]);
};
