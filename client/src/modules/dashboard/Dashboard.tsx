import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Dashboard: React.FC = () => {
  const { data: transactions } = useQuery(getTransactionsQueryOptions());
  return (
    <div>
      {transactions?.data?.map((transaction) => (
        <div key={transaction.id}>
          <h1>{transaction.amount}</h1>
        </div>
      ))}
    </div>
  );
}; 