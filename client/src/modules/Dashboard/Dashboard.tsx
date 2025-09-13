import { Card } from "@components/Card";
import { Button, Flex, Pagination, Select, Text } from "@gravity-ui/uikit";
import { TransactionsTable } from "@modules/Transactions";
import { getTransactionsQueryOptions } from "@modules/Transactions/api/queryOptions";
import { formatSprintName } from "@system/utils/formatSprintName";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";
import { DashboardSearchParams } from "../../routes/dashboard";
import { useGetReport } from "./api";
import { CategoriesDoughnutChart } from "./components/CategoriesDoughnutChart";
import { SprintsBarChart } from "./components/SprintsBarChart";
import styles from "./Dashboard.module.scss";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dashboard/" }) as DashboardSearchParams;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const transactionsQuery = useQuery(
    getTransactionsQueryOptions(
      {
        query: {
          sprintId: search.sprintId,
          categoryId: search.categoryId,
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      },
      {
        keepPrevious: true,
      },
    ),
  );

  const { data: reportData } = useGetReport({
    sprintId: search.sprintId,
    categoryId: search.categoryId,
  });

  const handleSprintClick = (sprintId: number) => {
    navigate({
      to: "/dashboard",
      search: {
        ...search,
        sprintId: search.sprintId === sprintId ? undefined : sprintId,
      },
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate({
      to: "/dashboard",
      search: {
        ...search,
        categoryId: search.categoryId === categoryId ? undefined : categoryId,
      },
    });
  };

  const handleResetFilters = () => {
    navigate({
      to: "/dashboard",
      search: {},
    });
  };

  const handleSprintSelectChange = (value: string[]) => {
    const sprintId = value.length > 0 ? Number(value[0]) : undefined;
    navigate({
      to: "/dashboard",
      search: { ...search, sprintId },
    });
  };

  const handleCategorySelectChange = (value: string[]) => {
    const categoryId = value.length > 0 ? Number(value[0]) : undefined;
    navigate({
      to: "/dashboard",
      search: { ...search, categoryId },
    });
  };

  const hasActiveFilters = search.sprintId || search.categoryId;

  const sprintOptions = useMemo(() => {
    if (!reportData?.sprints?.items) return [];
    return reportData.sprints.items.map((sprint) => ({
      value: sprint.id.toString(),
      content: formatSprintName(sprint.startDate, sprint.endDate),
    }));
  }, [reportData?.sprints?.items]);

  const categoryOptions = useMemo(() => {
    if (!reportData?.categories?.items) return [];
    return reportData.categories.items.map((category) => ({
      value: category.id.toString(),
      content: category.name,
    }));
  }, [reportData?.categories?.items]);

  return (
    <div className={styles.content}>
      <div className={styles.filters}>
        <Flex gap={3} alignItems="center" spacing={{ mb: 5 }}>
          <Text variant="body-2" color="secondary">
            Фильтры:
          </Text>
          <Flex gap={2} alignItems="center">
            <Select
              placeholder="Выберите спринт"
              options={sprintOptions}
              value={search.sprintId ? [search.sprintId.toString()] : []}
              onUpdate={handleSprintSelectChange}
              width={200}
              hasClear
            />
            <Select
              placeholder="Выберите категорию"
              options={categoryOptions}
              value={search.categoryId ? [search.categoryId.toString()] : []}
              onUpdate={handleCategorySelectChange}
              width={200}
              hasClear
            />
            {hasActiveFilters && (
              <Button view="outlined" onClick={handleResetFilters}>
                Сбросить все
              </Button>
            )}
          </Flex>
        </Flex>
      </div>

      <div className={styles.charts}>
        <Card maxWidth={"none"} title="Спринты">
          <Flex style={{ height: "100%" }} alignItems="center">
            <SprintsBarChart
              data={reportData?.sprints?.items || []}
              onSprintSelect={handleSprintClick}
              selectedSprintId={search.sprintId}
            />
          </Flex>
        </Card>

        <Card maxWidth={"none"} title="Категории">
          <CategoriesDoughnutChart
            selectedCategoryId={search.categoryId}
            data={reportData?.categories?.items || []}
            onCategorySelect={handleCategoryClick}
          />
        </Card>
      </div>

      <div className={styles.transactions}>
        <Card maxWidth={"100%"} title="Список транзакций">
          <TransactionsTable
            transactions={transactionsQuery.data?.transactions || []}
            width="max"
            isPreviousData={transactionsQuery.isPlaceholderData}
            isLoading={transactionsQuery.isLoading}
          />
          <div className={styles.pagination}>
            <Pagination
              total={transactionsQuery.data?.total || 0}
              page={page}
              pageSize={pageSize}
              onUpdate={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              pageSizeOptions={[50, 100, 200]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
