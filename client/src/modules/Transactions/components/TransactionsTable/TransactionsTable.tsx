import { TransactionDetailedResponseDto } from "@generated";
import { Loader, Table, TableProps } from "@gravity-ui/uikit";
import { FC, useMemo } from "react";
import { transactionsColumns } from "./consts";
import { TTransactionColumnKey } from "@modules/Transactions/types";
import styles from "./TransactionsTable.module.scss";

type Props = {
  transactions: TransactionDetailedResponseDto[];
  columnsKeys?: TTransactionColumnKey[];
  isPreviousData?: boolean;
} & Omit<TableProps<TransactionDetailedResponseDto>, 'data' | 'columns' | 'emptyMessage'>

export const TransactionsTable: FC<Props> = ({ transactions, columnsKeys = ['amount', 'date', 'comment', 'actions'], isPreviousData, ...props }) => {
  const columns = useMemo(() => columnsKeys.map(key => transactionsColumns.find(transactionColumn => transactionColumn.id === key)!), [columnsKeys])
  return (
    <div className={styles.container}>
      {isPreviousData && (
        <div className={styles.loaderOverlay}>
          <Loader size="l" />
        </div>
      )}
      <Table
        getRowDescriptor={(row) => ({
          id: row.id.toString(),
        })}
        emptyMessage="Не найдено транзакций"
        columns={columns}
        data={transactions}
        {...props}
      />
    </div>
  );
};
