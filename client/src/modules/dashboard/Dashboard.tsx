import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { SprintsBarChart } from './components/SprintsBarChart';
import { CategoriesDoughnutChart } from './components/CategoriesDoughnutChart';
import { Button, Flex, Text, Label } from '@gravity-ui/uikit';
import { DashboardSearchParams } from '../../routes/dashboard';
import { getSprintsQueryOptions } from '@modules/Sprints/api/queryOptions';
import { getCategoriesQueryOptions } from '@modules/Categories/api/queryOptions';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@system/consts';
import { TransactionsTable } from '@modules/Transactions';
import styles from './Dashboard.module.scss';
import { Card } from '@components/Card';

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
    console.log({ byCategory })
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
    <div className={styles.content}>
      {hasActiveFilters && (
        <div className={styles.filters}>
          <Flex gap={3} alignItems="center" spacing={{ mb: 5 }}>
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
        </div>
      )}

      <div className={styles.charts}>
        {showSprintsChart && Object.keys(groupedTransactions.bySprint).length > 0 && (
          <Card maxWidth={"none"} title='Спринты'>
            <Flex style={{ height: '100%' }} alignItems='center'>
              <SprintsBarChart
                data={groupedTransactions.bySprint}
                onSprintSelect={handleSprintClick}
              />
            </Flex>
          </Card>
        )}
        {showCategoriesChart && Object.keys(groupedTransactions.byCategory).length > 0 && (
          <Card maxWidth={"none"} title='Категории'>
            <CategoriesDoughnutChart
              data={groupedTransactions.byCategory}
              onCategorySelect={handleCategoryClick}
            />
          </Card>
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
      </div>

      <div className={styles.transactions}>
        <Card maxWidth={"100%"} title='Список транзакций'>
          <TransactionsTable
            transactions={transactions?.data || []}
            width='max'
          />
        </Card>
      </div>
    </div>
  );
}; 