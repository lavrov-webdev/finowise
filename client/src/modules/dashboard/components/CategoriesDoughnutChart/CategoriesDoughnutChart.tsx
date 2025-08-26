import { CategoryReportResponseDto } from '@generated';
import { formatAmount } from "@system/utils/formatAmount";
import React, { MouseEventHandler, useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DoughnutChartProps {
  data: CategoryReportResponseDto[];
  onClick?: MouseEventHandler<HTMLCanvasElement>;
  onCategorySelect?: (categoryId: number) => void;
}

export const CategoriesDoughnutChart: React.FC<DoughnutChartProps> = ({ data, onClick: _onClick, onCategorySelect }) => {
  const chartData = useMemo(() => {
    return data.reduce((acc, category) => {
      if (category.totalSpend !== 0) {
        acc.push({
          id: category.id,
          name: category.name,
          value: -category.totalSpend,
          categoryId: category.id
        });
      }
      return acc;
    }, [] as { id: number; name: string; value: number; categoryId: number }[]);
  }, [data]);

  const total = useMemo(() => 
    chartData.reduce((sum, item) => sum + item.value, 0), 
    [chartData]
  );

  const handleClick = (entry: any) => {
    onCategorySelect?.(entry.categoryId);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: '0' }}>{formatAmount(data.value)} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  console.log(chartData, "chartData", total, "total")
  
  return (
    <ResponsiveContainer width="100%" height={400}>
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
          style={{ cursor: 'pointer' }}
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value: string, _entry: any) => (
            <span style={{ color: '#333' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}; 