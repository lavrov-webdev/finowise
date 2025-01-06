import { TransactionDetailedResponseDto } from "@generated";
import { Table } from "@gravity-ui/uikit";
import { FC, useMemo } from "react";
import { transactionsColumns } from "./consts";
import { TTransactionColumnKey } from "@modules/Transactions/types";

type Props = {
  transactions: TransactionDetailedResponseDto[];
  columnsKeys?: TTransactionColumnKey[]
};

export const TransactionsTable: FC<Props> = ({ transactions, columnsKeys = ['amount', 'date', 'comment', 'actions'] }) => {
  const columns = useMemo(() => columnsKeys.map(key => transactionsColumns.find(transactionColumn => transactionColumn.id === key)!), [columnsKeys])
  return (
    <Table
      getRowDescriptor={(row) => ({
        id: row.id.toString(),
      })}
      emptyMessage="Не найдено транзакций"
      columns={columns}
      data={transactions}
    />
  );
};
