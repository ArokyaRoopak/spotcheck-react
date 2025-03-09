import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { CategoryData } from "../sales-category-card";
import Text from "../../../../components/text";

export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const SalesPieChart: React.FC<{ data: CategoryData[] }> = ({ data }) => {
  return (
    <PieChart
      width={280}
      height={240}
      style={{ width: "100%", height: "110%" }}
      className="xl:-ml-4"
    >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={85}
        outerRadius={120}
        paddingAngle={1}
        dataKey="amount"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-2xl lg:text-3xl font-bold font-noto"
      >
        {`$${(
          data.reduce((acc, item) => acc + item.amount, 0) /
          data.length /
          1000
        ).toFixed(1)}k`}
      </text>
      <Tooltip
        content={({ payload }) =>
          payload?.length ? (
            <div className="px-2.5 py-1 rounded-lg bg-[#8884d8] text-white text-sm font-medium flex xl:hidden flex-col">
              <Text className="text-sm">{payload[0].name}</Text>
              <Text className="font-semibold text-base">{`$${payload[0].value}`}</Text>
            </div>
          ) : null
        }
        offset={0}
      />
    </PieChart>
  );
};

export default SalesPieChart;
