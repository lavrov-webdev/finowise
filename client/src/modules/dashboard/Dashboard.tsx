import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { SprintsBarChart } from './components/SprintsBarChart';
import { CategoriesDoughnutChart } from './components/CategoriesDoughnutChart';
import { Button, Flex, Text, Icon, Label } from '@gravity-ui/uikit';
import { DashboardSearchParams } from '../../routes/dashboard';
import { getSprintsQueryOptions } from '@modules/Sprints/api/queryOptions';
import { getCategoriesQueryOptions } from '@modules/Categories/api/queryOptions';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@system/consts';

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

  const { data: sprints } = useQuery(getSprintsQueryOptions());
  const { data: categories } = useQuery(getCategoriesQueryOptions());

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

  const handleResetFilters = () => {
    navigate({
      to: '/dashboard',
      search: {},
    });
  };

  const handleRemoveSprintFilter = () => {
    navigate({
      to: '/dashboard',
      search: { ...search, sprintId: undefined },
    });
  };

  const handleRemoveCategoryFilter = () => {
    navigate({
      to: '/dashboard',
      search: { ...search, categoryId: undefined },
    });
  };

  const showSprintsChart = !search.sprintId;
  const showCategoriesChart = !search.categoryId;

  const activeFilters = useMemo(() => {
    const filters = [];

    if (search.sprintId) {
      const sprint = sprints?.data?.find(s => s.id === search.sprintId);
      if (sprint) {
        filters.push({
          type: 'sprint',
          label: `Спринт: ${dayjs(sprint.startDate).format(DATE_FORMAT)} - ${dayjs(sprint.endDate).format(DATE_FORMAT)}`,
          onRemove: handleRemoveSprintFilter,
        });
      }
    }

    if (search.categoryId) {
      const category = categories?.data?.find(c => c.id === search.categoryId);
      if (category) {
        filters.push({
          type: 'category',
          label: `Категория: ${category.name}`,
          onRemove: handleRemoveCategoryFilter,
        });
      }
    }

    return filters;
  }, [search, sprints?.data, categories?.data]);

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div>
      {hasActiveFilters && (
        <Flex gap={3} alignItems="center" >
          <Text variant="body-2" color="secondary">
            Активные фильтры:
          </Text>

          <Flex gap={2} alignItems="center">
            {activeFilters.map((filter, index) => (
              <Flex
                key={`${filter.type}-${index}`}
                gap={1}
                alignItems="center"
              >
                <Label type='close' onCloseClick={filter.onRemove}>
                  {filter.label}
                </Label>
              </Flex>
            ))}
          </Flex>

          {activeFilters.length > 1 && (
            <Button
              view="outlined"
              size="s"
              onClick={handleResetFilters}
            >
              Сбросить все
            </Button>
          )}
        </Flex>
      )}

      <Flex height={500} gap={2} alignItems='center'>
        {showSprintsChart && Object.keys(groupedTransactions.bySprint).length > 0 && (
          <SprintsBarChart
            data={groupedTransactions.bySprint}
            onSprintSelect={handleSprintClick}
          />
        )}
        {showCategoriesChart && Object.keys(groupedTransactions.byCategory).length > 0 && (
          <CategoriesDoughnutChart
            data={groupedTransactions.byCategory}
            onCategorySelect={handleCategoryClick}
          />
        )}

        {!showSprintsChart && !showCategoriesChart && (
          <Flex alignItems="center" justifyContent="center" style={{ width: '100%', height: '100%' }}>
            <Text variant="body-2" color="secondary">
              Выберите данные для отображения, сбросив фильтры
            </Text>
          </Flex>
        )}

        {(showSprintsChart && Object.keys(groupedTransactions.bySprint).length === 0) ||
          (showCategoriesChart && Object.keys(groupedTransactions.byCategory).length === 0) ? (
          <Flex alignItems="center" justifyContent="center" style={{ width: '100%', height: '100%' }}>
            <Text variant="body-2" color="secondary">
              Нет данных для отображения
            </Text>
          </Flex>
        ) : null}
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