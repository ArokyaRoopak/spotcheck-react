import React from "react";
import { IAnalyticsData } from "../sales-analytics-card";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "../../util/functions";

const SalesAreaChart: React.FC<{ data: IAnalyticsData[] }> = ({ data }) => {
  return (
    <AreaChart
      width={850}
      height={300}
      data={data}
      style={{ width: "103%", height: "98%" }}
      className="-ml-2 sm:-ml-3"
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="9%" stopColor="#ff7e3d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ff7e3d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="date"
        axisLine={false}
        padding={{ left: 5, right: 5 }}
        fontSize={12}
        tickLine={false}
        tickSize={15}
        tickFormatter={formatDate}
      />
      <YAxis
        dataKey="amount"
        axisLine={false}
        padding={{ top: 10, bottom: 10 }}
        fontSize={13}
        tickLine={false}
        tickSize={15}
        tickFormatter={(value) => `${value / 1000}K`}
      />

      <CartesianGrid
        strokeDasharray="6"
        vertical={false}
        fillOpacity={0.1}
        stroke="#8884d840"
      />
      <Tooltip
        content={({ payload }) =>
          payload?.length ? (
            <div className="px-2.5 py-1 rounded-lg bg-[#8884d8] text-white text-sm font-medium">
              {`$${payload[0].value}`}
            </div>
          ) : null
        }
      />
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#ff7e3d"
        strokeWidth={2}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

export default SalesAreaChart;
