import { TGetSprintWithEnvelopesAndTransactionsDto } from "@modules/Sprints";
import { TSprintSummary } from "../types";
import { useMemo } from "react";

export const useSprintSummary = (
  sprint: TGetSprintWithEnvelopesAndTransactionsDto | null,
): TSprintSummary => {
  return useMemo(() => {
    if (!sprint) {
      return {
        currentBalance: 0,
        initialAmount: 0,
        initialPlannedExpense: 0,
        initialPlannedRemaining: 0,
        totalExpenses: 0,
        remainingBudget: 0,
        actualPlannedRemaining: 0,
      };
    }
    const initialAmount = sprint.startSum;

    let totalExpenses = 0;
    let initialPlannedExpense = 0;
    let overspending = 0;

    sprint.envelopes.forEach((envelope) => {
      initialPlannedExpense += envelope.amount;
      const envelopeTransactions = envelope.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      );

      overspending -= Math.min(0, envelope.amount - envelopeTransactions);
      totalExpenses += envelopeTransactions;
    });

    const currentBalance = initialAmount - totalExpenses;
    const initialPlannedRemaining = initialAmount - initialPlannedExpense;
    const remainingBudget = initialPlannedExpense - totalExpenses;
    const actualPlannedRemaining = initialPlannedRemaining - overspending;

    return {
      currentBalance,
      initialAmount,
      initialPlannedExpense,
      initialPlannedRemaining,
      totalExpenses,
      remainingBudget,
      actualPlannedRemaining,
    };
  }, [sprint]);
};
