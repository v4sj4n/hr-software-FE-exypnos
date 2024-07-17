import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface PieChartComponentProps {
  data: DataItem[];
}

const COLORS = ['#0088FE', '#c542f5', '#9f6fd6', '#6db3e8'];

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <PieChart width={255} height={270}>
      <Pie
        data={data}
        cx={95}
        cy={90}
        innerRadius={36}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;