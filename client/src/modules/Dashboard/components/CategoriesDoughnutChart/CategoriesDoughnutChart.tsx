import { CategoryReportResponseDto } from '@generated';
import { formatAmount } from "@system/utils/formatAmount";
import React, { MouseEventHandler, useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { COLORS, GRAY_COLOR } from './const';
import styles from './CategoriesDoughnutChart.module.scss';
import _ from 'lodash';

interface DoughnutChartProps {
  data: CategoryReportResponseDto[];
  onClick?: MouseEventHandler<HTMLCanvasElement>;
  onCategorySelect?: (categoryId: number) => void;
  selectedCategoryId?: number;
}

type ChartData = {
  id: number;
  name: string;
  value: number;
  categoryId: number;
}

export const CategoriesDoughnutChart: React.FC<DoughnutChartProps> = ({ data, onClick: _onClick, onCategorySelect, selectedCategoryId }) => {
  const chartData = useMemo(() =>
    data.reduce<ChartData[]>((acc, category) => {
      if (category.totalSpend > 0) {
        acc.push({
          id: category.id,
          name: category.name,
          value: category.totalSpend,
          categoryId: category.id
        });
      }
      return acc;
    }, []),
    [data]);

  const total = useMemo(() => _.sumBy(chartData, 'value'), [chartData]);

  const handleClick = (entry: any) => {
    onCategorySelect?.(entry.categoryId);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipTitle}>{data.name}</p>
          <p className={styles.tooltipContent}>{formatAmount(data.value)} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  const getCellColor = (entry: any, index: number) => {
    if (selectedCategoryId === undefined) {
      return COLORS[index % COLORS.length];
    }

    if (entry.categoryId === selectedCategoryId) {
      return COLORS[index % COLORS.length];
    }

    return GRAY_COLOR;
  };

  const getCellStroke = (entry: any) => {
    if (selectedCategoryId !== undefined && entry.categoryId === selectedCategoryId) {
      return '#333';
    }
    return 'none';
  };

  const getCellStrokeWidth = (entry: any) => {
    if (selectedCategoryId !== undefined && entry.categoryId === selectedCategoryId) {
      return 3;
    }
    return 0;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          paddingAngle={5}
          dataKey="value"
          onClick={handleClick}
          className={styles.pieChart}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${entry.id}`}
              fill={getCellColor(entry, index)}
              stroke={getCellStroke(entry)}
              strokeWidth={getCellStrokeWidth(entry)}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value: string, _entry: any) => (
            <span className={styles.legendText}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}; 