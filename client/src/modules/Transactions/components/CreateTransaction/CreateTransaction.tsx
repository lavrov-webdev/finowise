import { getTransactionsQueryOptions } from "@modules/Transactions/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { TransactionsTable } from "../TransactionsTable";
import { Card } from "@components/Card";
import { Form } from "./Form";
import styles from "./CreateTransaction.module.scss";
import { Loader } from "./Loader";

export const CreateTransaction = () => {
  const transactionsState = useQuery(getTransactionsQueryOptions());
  const renderTransactions = () => {
    if (transactionsState.isLoading) {
      //TODO create skeleton
      return <Loader />;
    }
    if (!transactionsState.data) {
      //TODO create empty data message
      return <div>Data is undefined</div>;
    }
    return (
      <Card title="Все транзакции" className={styles.transactions}>
        <TransactionsTable transactions={transactionsState.data} />
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
