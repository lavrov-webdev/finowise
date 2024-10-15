import { TGetEnvelopeWithTransactionsDto } from "@modules/Envelopes/types";
import { useMemo } from "react";
import { TEnvelopeSummary } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "@modules/Categories";

export const useEnvelopesSummary = (
  envelopes: TGetEnvelopeWithTransactionsDto[],
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
          categories.data?.find(
            (category) => category.id === envelope.categoryId,
          )?.name || "",
      };
    });
  }, [envelopes, categories.data]);
};
