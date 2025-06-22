import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import _ from 'lodash';
import React, { MouseEventHandler, useMemo, useRef } from 'react';
import { Doughnut, getElementAtEvent } from 'react-chartjs-2';
import { TransactionDetailedResponseDto } from '@generated';
import { getCategoriesQueryOptions } from "@modules/Categories/api/queryOptions";
import { useQuery } from "@tanstack/react-query";

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

    // Цвета для категорий
    const colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 205, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(201, 203, 207, 0.8)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 205, 86, 0.6)',
    ];

    return {
      labels: categories,
      datasets: [{
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color.replace('0.8', '1').replace('0.6', '1')),
        borderWidth: 2,
        hoverOffset: 4
      }]
    };
  }, [data, categoriesQuery.data]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
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
          label: function (context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toFixed(2)} (${percentage}%)`;
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
    <div style={{ height: '400px', position: 'relative' }}>
      <Doughnut
        ref={chartRef}
        id='categories-doughnut'
        data={chartData}
        options={options}
        onClick={handleClick}
      />
    </div>
  );
}; 