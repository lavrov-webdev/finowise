import { TransactionDetailedResponseDto } from '@generated';
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
  onCategorySelect?: (categoryId: number) => void;
}

export const CategoriesDoughnutChart: React.FC<DoughnutChartProps> = ({ data, onClick, onCategorySelect }) => {
  const chartRef = useRef<ChartJS<"doughnut">>(null);

  const chartData = useMemo(() => {
    const categoryIds = Object.keys(data);
    const categories = categoryIds.map(categoryId => data[categoryId][0].category.name);
    const amounts = categoryIds.map(categoryId =>
      data[categoryId].reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0)
    );

    return {
      labels: categories,
      datasets: [{
        data: amounts,
      }]
    };
  }, [data]);

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
      const elements = getElementAtEvent(chartRef.current, event);
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const categoryIds = Object.keys(data);
        const categoryId = +categoryIds[elementIndex];
        onCategorySelect?.(categoryId);
      }
    }
    onClick?.(event);
  };

  return (
    <Doughnut
      ref={chartRef}
      id='categories-doughnut'
      data={chartData}
        onClick={handleClick}
        options={options}
      />
  );
}; 