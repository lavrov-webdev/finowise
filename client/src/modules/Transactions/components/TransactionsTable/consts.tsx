import { TableColumnConfig } from "@gravity-ui/uikit";
import { TGetTransactionDto } from "@modules/Transactions/types";
import { ActionsCell } from "./ActionsCell";

export const transactionsColumns: TableColumnConfig<TGetTransactionDto>[] = [
  {
    id: "amount",
    name: "Сумма",
    template: (item) =>
      item.amount.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
      }),
    align: "start",
  },
  {
    id: "date",
    name: "Дата",
    template: (item) => item.date.toLocaleDateString("ru-RU"),
    align: "end",
  },
  {
    id: "comment",
    name: "Комментарий",
    template: (item) => item.comment ?? "Нет комментария",
    align: "end",
  },
  {
    id: "actions",
    name: "Действия",
    template: (transaction) => <ActionsCell transaction={transaction} />,
    align: "center",
  },
];
