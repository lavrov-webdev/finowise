import { useMemo } from "react";
import { TEnvelopeSummary } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "@modules/Categories";
import { EnvelopeDetailedResponseDto } from "@generated";

export const useEnvelopesSummary = (
  envelopes: EnvelopeDetailedResponseDto[],
): TEnvelopeSummary[] => {
  const categories = useQuery(getCategoriesQueryOptions());
  return useMemo(() => {
    return envelopes.map((envelope) => {
      const totalExpenses = envelope.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      );
      return {
        id: envelope.id,
        initialPlannedExpense: envelope.amount,
        totalExpenses,
        remainingBudget: envelope.amount - totalExpenses,
        categoryName:
          categories.data?.data?.find(
            (category) => category.id === envelope.categoryId,
          )?.name || "",
      };
    });
  }, [envelopes, categories.data]);
};
