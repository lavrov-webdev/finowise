import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { SprintsBarChart } from './components/SprintsBarChart';
import { CategoriesDoughnutChart } from './components/CategoriesDoughnutChart';
import { Flex } from '@gravity-ui/uikit';

export const Dashboard: React.FC = () => {
  const { data: transactions } = useQuery(getTransactionsQueryOptions());
  const groupedTransactions = useMemo(() => {
    const bySprint = _.groupBy(transactions?.data, "sprintId");
    const byCategory = _.groupBy(transactions?.data, "category.id");
    return { bySprint, byCategory };
  }, [transactions]);

  return (
    <div>
      <Flex height={500} gap={2} alignItems='center'>
        <SprintsBarChart data={groupedTransactions.bySprint} />
        <CategoriesDoughnutChart data={groupedTransactions.byCategory} />
      </Flex>
      {Object.entries(groupedTransactions.bySprint).map(([sprintId, transactions]) => (
        <div key={sprintId}>
          <h1>{sprintId} sprint</h1>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <h1>{transaction.amount} {transaction.category.id}</h1>
            </div>
          ))}
        </div>
      ))}
      {Object.entries(groupedTransactions.byCategory).map(([categoryId, transactions]) => (
        <div key={categoryId}>
          <h1>{categoryId} category</h1>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <h1>{transaction.amount} {transaction.category.id}</h1>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}; 