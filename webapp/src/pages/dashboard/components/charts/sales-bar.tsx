import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { IAnalyticsData } from "../sales-analytics-card";
import { formatDate } from "../../util/functions";

const SaleBarChart: React.FC<{ data: IAnalyticsData[] }> = ({ data }) => {
  return (
    <BarChart
      width={750}
      height={480}
      data={data}
      className="-ml-2 sm:-ml-3"
      style={{ width: "105%", height: "98%" }}
    >
      <Bar dataKey="amount" fill="#ff7e3d" />
      <XAxis
        dataKey="date"
        tickFormatter={formatDate}
        tickSize={15}
        tickLine={false}
      />
      <YAxis dataKey="amount" tickFormatter={(value) => `${value / 1000}K`} />
    </BarChart>
  );
};

export default SaleBarChart;
