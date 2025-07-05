import { BarElement, CategoryScale, ChartData, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import _ from 'lodash';
import React, { MouseEventHandler, useMemo, useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import { TransactionDetailedResponseDto } from '@generated';
import { getSprintsQueryOptions } from "@modules/Sprints/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@system/consts";
import { Flex } from "@gravity-ui/uikit";
import { CHART_COLORS } from "@modules/dashboard/consts";
import { formatAmount } from "@system/utils/formatAmount";

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
  onSprintSelect?: (sprintId: number) => void;
}

export const SprintsBarChart: React.FC<BarChartProps> = ({ data, onClick, onSprintSelect }) => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const sprintsQuery = useQuery(getSprintsQueryOptions());

  const chartData = useMemo<ChartData<"bar">>(() => {
    return {
      labels: Object.keys(data).map(sprintId => {
        const sprint = sprintsQuery.data?.data?.find(sprint => sprint.id === +sprintId);
        return `${dayjs(sprint?.startDate).format(DATE_FORMAT)} - ${dayjs(sprint?.endDate).format(DATE_FORMAT)}`;
      }),
      datasets: [{
        label: "Sprints",
        backgroundColor: CHART_COLORS[0],
        data: Object.values(data).map(transactions => transactions.reduce((acc, transaction) => acc - transaction.amount, 0)),
      }],
    };
  }, [data, sprintsQuery.data]);

  const handleClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (chartRef.current) {
      const elements = getElementAtEvent(chartRef.current, event);
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const sprintId = +Object.keys(data)[elementIndex];
        onSprintSelect?.(sprintId);
      }
    }
    onClick?.(event);
  };

  return (
    <Flex alignItems="center" justifyContent="center" style={{ width: '50%', maxHeight: "100%" }}>
      <Bar
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ` ${formatAmount(context.raw as number)}`;
                }
              }
            }
          }
        }
        }
        ref={chartRef}
        id='sprints-bar'
        data={chartData}
        onClick={handleClick}
      />
    </Flex>
  );
}; 