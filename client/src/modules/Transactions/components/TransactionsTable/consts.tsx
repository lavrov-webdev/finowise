import { TableColumnConfig } from "@gravity-ui/uikit";
import { ActionsCell } from "./ActionsCell";
import { TransactionDetailedResponseDto } from "@generated";

export const transactionsColumns: TableColumnConfig<TransactionDetailedResponseDto>[] = [
  {
    id: "id",
    name: "ID",
    template: (item) => item.id,
    align: "start",
  },
  {
    id: "createdAt",
    name: "Создан",
    template: (item) => new Date(item.createdAt).toLocaleDateString("ru-RU"),
    align: "end",
  },
  {
    id: "updatedAt",
    name: "Последнее обновление",
    template: (item) => new Date(item.updatedAt).toLocaleDateString("ru-RU"),
    align: "end",
  },
  {
    id: "envelopeId",
    name: "ID конверта",
    template: (item) => item.envelopeId,
    align: "start",
  },
  {
    id: "sprintId",
    name: "ID спринта",
    template: (item) => item.sprintId,
    align: "start",
  },
  {
    id: "userId",
    name: "ID пользователя",
    template: (item) => item.userId,
    align: "start",
  },
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
    template: (item) => new Date(item.date).toLocaleDateString("ru-RU"),
    align: "end",
  },
  {
    id: "comment",
    name: "Комментарий",
    template: (item) => item.comment ?? "Нет комментария",
    align: "end",
  },
  {
    id: "category",
    name: "Категория",
    template: (item) => item.category.name,
    align: "center",
  },
  {
    id: "actions",
    name: "Действия",
    template: (transaction) => <ActionsCell transaction={transaction} />,
    align: "center",
  },
] as const;