import { TransactionDetailedResponseDto } from '@generated';
import { CHART_COLORS } from "@modules/dashboard/consts";
import { getSprintsQueryOptions } from "@modules/Sprints/api/queryOptions";
import { DATE_FORMAT } from "@system/consts";
import { formatAmount } from "@system/utils/formatAmount";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { MouseEventHandler, useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface BarChartProps {
  data: Record<string, TransactionDetailedResponseDto[]>;
  onClick?: MouseEventHandler<HTMLCanvasElement>;
  onSprintSelect?: (sprintId: number) => void;
}

export const SprintsBarChart: React.FC<BarChartProps> = ({ data, onClick: _onClick, onSprintSelect }) => {
  const sprintsQuery = useQuery(getSprintsQueryOptions());

  const chartData = useMemo(() => {
    const sprintIds = Object.keys(data);

    return sprintIds.map(sprintId => {
      const sprint = sprintsQuery.data?.data?.find(sprint => sprint.id === +sprintId);
      const amount = data[sprintId].reduce((acc, transaction) => acc + transaction.amount, 0);
      
      return {
        sprintId: +sprintId,
        name: sprint ? `${dayjs(sprint.startDate).format(DATE_FORMAT)} - ${dayjs(sprint.endDate).format(DATE_FORMAT)}` : sprintId,
        amount: amount
      };
    });
  }, [data, sprintsQuery.data]);

  const handleClick = (data: any) => {
    let sprintId: number | undefined;
    
    if (data && typeof data === 'object') {
      if (data.sprintId !== undefined) {
        sprintId = +data.sprintId;
      } else if (data.payload && data.payload.sprintId !== undefined) {
        sprintId = +data.payload.sprintId;
      } else if (data.activePayload && data.activePayload[0] && data.activePayload[0].payload) {
        sprintId = +data.activePayload[0].payload.sprintId;
      }
    }
    
    if (sprintId && !isNaN(sprintId)) {
      onSprintSelect?.(sprintId);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: '0', color: CHART_COLORS[0] }}>
            {formatAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        style={{ cursor: 'pointer' }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          tickFormatter={(value: number) => formatAmount(value)}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          width={120}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="amount" 
          fill={CHART_COLORS[0]}
          radius={[0, 4, 4, 0]}
          onClick={handleClick}
          onMouseDown={handleClick}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 