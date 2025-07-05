import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { SprintsBarChart } from './components/SprintsBarChart';
import { CategoriesDoughnutChart } from './components/CategoriesDoughnutChart';
import { Flex } from '@gravity-ui/uikit';
import { DashboardSearchParams } from '../../routes/dashboard';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/dashboard/' }) as DashboardSearchParams;
  
  const { data: transactions } = useQuery(
    getTransactionsQueryOptions({ 
      filters: {
        sprintId: search.sprintId,
        categoryId: search.categoryId,
      }
    })
  );

  const groupedTransactions = useMemo(() => {
    const bySprint = _.groupBy(transactions?.data, "sprintId");
    const byCategory = _.groupBy(transactions?.data, "category.id");
    return { bySprint, byCategory };
  }, [transactions]);

  const handleSprintClick = (sprintId: number) => {
    navigate({
      to: '/dashboard',
      search: { ...search, sprintId },
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate({
      to: '/dashboard',
      search: { ...search, categoryId },
    });
  };

  const showSprintsChart = !search.sprintId;
  const showCategoriesChart = !search.categoryId;

  return (
    <div>
      <Flex height={500} gap={2} alignItems='center'>
        {showSprintsChart && (
          <SprintsBarChart 
            data={groupedTransactions.bySprint} 
            onSprintSelect={handleSprintClick}
          />
        )}
        {showCategoriesChart && (
          <CategoriesDoughnutChart 
            data={groupedTransactions.byCategory} 
            onCategorySelect={handleCategoryClick}
          />
        )}
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