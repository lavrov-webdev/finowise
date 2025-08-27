import { CategoryReportResponseDto } from '@generated';
import { formatAmount } from "@system/utils/formatAmount";
import React, { MouseEventHandler, useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DoughnutChartProps {
  data: CategoryReportResponseDto[];
  onClick?: MouseEventHandler<HTMLCanvasElement>;
  onCategorySelect?: (categoryId: number) => void;
  selectedCategoryId?: number;
}

export const CategoriesDoughnutChart: React.FC<DoughnutChartProps> = ({ data, onClick: _onClick, onCategorySelect, selectedCategoryId }) => {
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
  const GRAY_COLOR = '#D3D3D3';

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
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
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
            <span style={{ color: '#333' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}; 