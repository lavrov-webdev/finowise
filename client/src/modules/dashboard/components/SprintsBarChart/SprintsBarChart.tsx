import { BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import _ from 'lodash';
import React, { MouseEventHandler, useMemo, useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { TransactionDetailedResponseDto } from '@generated';
import { getSprintsQueryOptions } from "@modules/Sprints/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@system/consts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Record<string, TransactionDetailedResponseDto[]>;
  onClick?: MouseEventHandler<HTMLCanvasElement>;
}

export const SprintsBarChart: React.FC<BarChartProps> = ({ data, onClick }) => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const sprintsQuery = useQuery(getSprintsQueryOptions());

  const chartData = useMemo<ChartData<"bar">>(() => {
    return {      
      labels: Object.keys(data).map(sprintId => {
        const sprint = sprintsQuery.data?.data?.find(sprint => sprint.id === +sprintId);
        return `${dayjs(sprint?.startDate).format(DATE_FORMAT)} - ${dayjs(sprint?.endDate).format(DATE_FORMAT)}`;
      }),
      datasets: [{
        label: 'Sprints',
        data: Object.values(data).map(transactions => transactions.reduce((acc, transaction) => acc - transaction.amount, 0)),
      }],
    };
  }, [data]);

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (chartRef.current) {
      console.log(getElementAtEvent(chartRef.current, event));
    }
    onClick?.(event);
  };
  
  return (
    <div>
      <Bar 
        height={50}
        ref={chartRef}
        id='sprints-bar'
        data={chartData}
        onClick={handleClick}
        options={{
          color: 'red',
          backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'],
        }}
      />
    </div>
  );
}; 