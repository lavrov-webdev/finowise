import { Table } from "@gravity-ui/uikit";
import { TGetTransactionDto } from "@modules/Transactions/types";
import { FC } from "react";
import { transactionsColumns } from "./consts";

type Props = {
  transactions: TGetTransactionDto[];
};

export const TransactionsTable: FC<Props> = ({ transactions }) => {
  return (
    <Table
      getRowDescriptor={(row) => ({
        id: row.id.toString(),
      })}
      emptyMessage="Не найдено транзакций"
      columns={transactionsColumns}
      data={transactions}
    />
  );
};
