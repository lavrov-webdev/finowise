import { Card } from '@components/Card';
import { Button, Flex, Label, Text } from '@gravity-ui/uikit';
import { TransactionsTable } from '@modules/Transactions';
import { getTransactionsQueryOptions } from '@modules/Transactions/api/queryOptions';
import { formatSprintName } from '@system/utils/formatSprintName';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React, { useMemo } from 'react';
import { DashboardSearchParams } from '../../routes/dashboard';
import { useGetReport } from './api';
import { CategoriesDoughnutChart } from './components/CategoriesDoughnutChart';
import { SprintsBarChart } from './components/SprintsBarChart';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/dashboard/' }) as DashboardSearchParams;

  const { data: transactions, isPlaceholderData } = useQuery(
    getTransactionsQueryOptions({
      filters: {
        sprintId: search.sprintId,
        categoryId: search.categoryId,
      }
    }, {
      keepPrevious: true
    })
  );

  const { data: reportData, } = useGetReport({
    sprintId: search.sprintId,
    categoryId: search.categoryId
  });

  const handleSprintClick = (sprintId: number) => {
    navigate({
      to: '/dashboard',
      search: {
        ...search,
        sprintId: search.sprintId === sprintId ? undefined : sprintId
      },
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate({
      to: '/dashboard',
      search: {
        ...search,
        categoryId: search.categoryId === categoryId ? undefined : categoryId
      },
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

  const activeFilters = useMemo(() => {
    const filters = [];

    if (search.sprintId && reportData) {
      const sprint = reportData.sprints?.items?.find(s => s.id === search.sprintId);
      if (sprint) {
        filters.push({
          type: 'sprint',
          label: `Спринт: ${formatSprintName(sprint.startDate, sprint.endDate)}`,
          onRemove: handleRemoveSprintFilter,
        });
      }
    }

    if (search.categoryId && reportData) {
      const category = reportData.categories?.items?.find(c => c.id === search.categoryId);
      if (category) {
        filters.push({
          type: 'category',
          label: `Категория: ${category.name}`,
          onRemove: handleRemoveCategoryFilter,
        });
      }
    }

    return filters;
  }, [search, reportData]);

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

        <Card maxWidth={"none"} title='Спринты'>
          <Flex style={{ height: '100%' }} alignItems='center'>
            <SprintsBarChart
              data={reportData?.sprints?.items || []}
              onSprintSelect={handleSprintClick}
              selectedSprintId={search.sprintId}
            />
          </Flex>
        </Card>

        <Card maxWidth={"none"} title='Категории'>
          <CategoriesDoughnutChart
            selectedCategoryId={search.categoryId}
            data={reportData?.categories?.items || []}
            onCategorySelect={handleCategoryClick}
          />
        </Card>
      </div>

      <div className={styles.transactions}>
        <Card maxWidth={"100%"} title='Список транзакций'>
          <TransactionsTable
            transactions={transactions?.data || []}
            width='max'
            isPreviousData={isPlaceholderData}
          />
        </Card>
      </div>
    </div>
  );
}; 