import { TableColumnConfig } from "@gravity-ui/uikit";
import { formatAmount } from "@system/utils/formatAmount";
import { TEnvelopeSummary } from "./types";
import { ActionsCell } from "./ActionsCell";

export const envelopeColumns: TableColumnConfig<TEnvelopeSummary>[] = [
  {
    id: "categoryName",
    name: "Категория",
    align: "left",
  },
  {
    id: "initialPlannedExpense",
    name: "План",
    placeholder: "0",
    align: "right",
    template: (item) => formatAmount(item.initialPlannedExpense),
  },
  {
    id: "totalExpenses",
    name: "Расходы",
    placeholder: "0",
    align: "right",
    template: (item) => formatAmount(item.totalExpenses),
  },
  {
    id: "remainingBudget",
    name: "Остаток",
    placeholder: "0",
    align: "right",
    template: (item) => formatAmount(item.remainingBudget),
  },
  {
    id: "actions",
    name: "Действия",
    align: "center",
    template: (item) => <ActionsCell envelope={item} />,
  },
];
