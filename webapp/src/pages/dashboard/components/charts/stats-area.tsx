import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const StatsAreaChart: React.FC<{
  data: number[];
  graphColor: string;
  isNegative: boolean;
}> = ({ data, graphColor, isNegative }) => {
  return (
    <ResponsiveContainer width="80%" height="75%">
      <AreaChart data={data.map((y, x) => ({ x, y }))}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a756a" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="error-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D22B2B" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="y"
          stroke={isNegative ? "#D22B2B" : graphColor}
          fill={isNegative ? "url(#error-gradient)" : "url(#gradient)"}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StatsAreaChart;
