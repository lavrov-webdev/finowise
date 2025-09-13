import { getTransactionsQueryOptions } from "@modules/Transactions/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "../TransactionsTable";
import { Card } from "@components/Card";
import { Form } from "./Form";
import styles from "./CreateTransaction.module.scss";
import { Loader } from "./Loader";
import { getCurrentSprintQueryOptions } from "@modules/Sprints";

export const CreateTransaction = () => {
  const currentSprintQuery = useQuery(getCurrentSprintQueryOptions());
  const transactionsState = useQuery(
    getTransactionsQueryOptions({
      query: { sprintId: currentSprintQuery.data?.data?.id },
    }),
  );
  const renderTransactions = () => {
    if (transactionsState.isLoading) {
      return <Loader />;
    }
    if (!transactionsState.data?.transactions) {
      return null;
    }
    return (
      <Card title="Все транзакции" className={styles.transactions}>
        <TransactionsTable
          transactions={transactionsState.data.transactions}
          columnsKeys={["amount", "date", "category", "comment", "actions"]}
        />
      </Card>
    );
  };
  return (
    <div className={styles.container}>
      <Form />
      {renderTransactions()}
    </div>
  );
};
