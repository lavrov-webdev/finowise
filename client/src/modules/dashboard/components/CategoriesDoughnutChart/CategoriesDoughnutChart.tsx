import { TransactionDetailedResponseDto } from '@generated';
import { Flex } from "@gravity-ui/uikit";
import { getCategoriesQueryOptions } from "@modules/Categories/api/queryOptions";
import { formatAmount } from "@system/utils/formatAmount";
import { useQuery } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from "chart.js";
import React, { MouseEventHandler, useMemo, useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface DoughnutChartProps {
  data: Record<string, TransactionDetailedResponseDto[]>;
  onClick?: MouseEventHandler<HTMLCanvasElement>;
}

export const CategoriesDoughnutChart: React.FC<DoughnutChartProps> = ({ data, onClick }) => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);
  const categoriesQuery = useQuery(getCategoriesQueryOptions());

  const chartData = useMemo(() => {
    const categories = Object.keys(data).map(categoryId => categoriesQuery.data?.data?.find(category => category.id === +categoryId)?.name);
    const amounts = Object.values(data).map(transactions =>
      transactions.reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0)
    );

    return {
      labels: categories,
      datasets: [{
        data: amounts,
      }]
    };
  }, [data, categoriesQuery.data]);

  const options = useMemo<ChartOptions<"doughnut">>(() => ({
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${label}: ${formatAmount(value)} (${percentage}%)`;
          }
        }
      }
    }
  }), []);

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (chartRef.current) {
      console.log(getElementAtEvent(chartRef.current, event));
    }
    onClick?.(event);
  };

  return (
    <Flex alignItems="center" justifyContent="center" style={{ width: '50%', maxHeight: "100%" }}>
    <Doughnut
      ref={chartRef}
      id='categories-doughnut'
      data={chartData}
        onClick={handleClick}
        options={options}
      />
    </Flex>
  );
}; 