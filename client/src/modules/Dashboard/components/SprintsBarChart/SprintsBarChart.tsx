import { SprintReportResponseDto } from "@generated";
import { BAR_COLOR } from "@modules/Dashboard/consts";
import { formatAmount } from "@system/utils/formatAmount";
import { formatSprintName } from "@system/utils/formatSprintName";
import React, { MouseEventHandler, useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface BarChartProps {
  data: SprintReportResponseDto[];
  onClick?: MouseEventHandler<HTMLCanvasElement>;
  onSprintSelect?: (sprintId: number) => void;
  selectedSprintId?: number;
}

export const SprintsBarChart: React.FC<BarChartProps> = ({
  data,
  onClick: _onClick,
  onSprintSelect,
  selectedSprintId,
}) => {
  const chartData = useMemo(() => {
    return data.map((sprint) => ({
      sprintId: sprint.id,
      name: formatSprintName(sprint.startDate, sprint.endDate),
      amount: sprint.totalSpend,
      fill:
        selectedSprintId === undefined
          ? BAR_COLOR
          : sprint.id === selectedSprintId
            ? BAR_COLOR
            : "#D3D3D3",
    }));
  }, [data, selectedSprintId]);

  const handleClick = (data: any) => {
    let sprintId: number | undefined;

    if (data && typeof data === "object") {
      if (data.sprintId !== undefined) {
        sprintId = +data.sprintId;
      } else if (data.payload && data.payload.sprintId !== undefined) {
        sprintId = +data.payload.sprintId;
      } else if (
        data.activePayload &&
        data.activePayload[0] &&
        data.activePayload[0].payload
      ) {
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
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>{label}</p>
          <p style={{ margin: "0", color: BAR_COLOR }}>
            {formatAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} style={{ cursor: "pointer" }}>
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
            <Cell key={`cell-${entry.sprintId}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
