import { BAR_COLOR, UNSELECTED_BAR_COLOR } from "@modules/Dashboard/consts";
import { getCategoryColor } from "@modules/Dashboard/utils";
import { formatAmount } from "@system/utils/formatAmount";
import { formatSprintName } from "@system/utils/formatSprintName";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./SprintsBarChart.module.scss";
import { BarChartData, BarChartProps, BarClickEvent, TooltipContentProps } from "./types";

export const SprintsBarChart: React.FC<BarChartProps> = ({
  data,
  onClick: _onClick,
  onSprintSelect,
  selectedSprintId,
  selectedCategoryId,
  categories,
}) => {
  const chartData = useMemo<BarChartData[]>(() => {
    return data.map((sprint) => {
      let fill = UNSELECTED_BAR_COLOR
      let activeBarColor = BAR_COLOR
      if (selectedCategoryId !== undefined) {
        const activeCategory = categories?.find(category => category.id === selectedCategoryId)
        activeBarColor = activeCategory ? getCategoryColor(activeCategory.name + activeCategory.id) : BAR_COLOR
      }
      if (selectedSprintId === sprint.id || selectedSprintId === undefined) {
        fill = activeBarColor
      }

      return {
        sprintId: sprint.id,
        name: formatSprintName(sprint.startDate, sprint.endDate),
        amount: sprint.totalSpend,
        fill,
      }
    });
  }, [data, selectedSprintId, selectedCategoryId, categories]);

  const handleClick: BarClickEvent = (data) => {
    const sprintId = data.payload?.sprintId;

    if (sprintId && !isNaN(sprintId)) {
      onSprintSelect?.(sprintId);
    }
  };

  const CustomTooltip = (data: TooltipContentProps) => {
    const { active, payload, label } = data
    if (active && payload && payload.length) {
      return (
        <div
          className={styles.tooltip}
        >
          <p className={styles.tooltipTitle}>{label}</p>
          <p style={{ color: payload[0].payload.fill }} className={styles.tooltipContent}>
            {formatAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} className={styles.chart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis
          type="number"
          tickFormatter={(value: number) => formatAmount(value)}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="amount"
          radius={[4, 4, 0, 0]}
          onClick={handleClick}
          onMouseDown={handleClick}
        >
          {chartData.map((entry) => (
            <Cell
              className={styles.cell}
              key={`cell-${entry.sprintId}`}
              fill={entry.fill}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
