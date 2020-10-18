import React from "react";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis} from 'recharts';

const MyLineChart = ({ data, width, height }) => {
  if (!data || data.length === 0) return <div>data yok</div>
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="created_at" />
      <YAxis dataKey="value" />
      <Tooltip />
      <CartesianGrid stroke="#f5f5f5" />
      <Line type="monotone" dataKey="value" stroke="#ff7300" yAxisId={0} />
    </LineChart>
  );
};

export default MyLineChart;
