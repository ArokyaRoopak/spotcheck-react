import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Text from "../../../components/text";
import CustomDropdown from "../../../components/custom-dropdown";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Sample categories
const categories = [
  { name: "Category A" },
  { name: "Category B" },
  { name: "Category C" },
  { name: "Category D" },
  { name: "Category E" },
];

const data = Array.from({ length: 30 }, (v, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const dailyData = categories.map((category) => {
    const amount = Math.floor(Math.random() * 5000) + 1000;
    return {
      category: category.name,
      amount: amount,
      product: Math.floor(Math.random() * 1000) + 1,
    };
  });
  return {
    id: i + 1,
    date: date.toISOString().split("T")[0],
    data: dailyData,
  };
}).reverse();

const SalesByCategoryCard: React.FC = () => {
  const [timeFrame, setTimeFrame] = React.useState("week");
  const [chartData, setChartData] = React.useState(
    categories.map((cat) => ({ name: cat.name, amount: 0, product: 0 }))
  ); // Initialize with default data

  useEffect(() => {
    const generateData = () => {
      const categoryTotals = categories.map((cat) => ({
        name: cat.name,
        amount: 0,
        product: 0,
      }));

      if (timeFrame === "week") {
        // Calculate totals for the last week
        const lastWeekData = data.slice(-7);
        lastWeekData.forEach((entry) => {
          entry.data.forEach((item) => {
            const category = categoryTotals.find(
              (cat) => cat.name === item.category
            );
            if (category) {
              category.amount += item.amount;
              category.product += item.product;
            }
          });
        });
      } else if (timeFrame === "month") {
        // Calculate totals for the last month
        const monthData = data;
        monthData.forEach((entry) => {
          entry.data.forEach((item) => {
            const category = categoryTotals.find(
              (cat) => cat.name === item.category
            );
            if (category) {
              category.amount += item.amount;
            }
          });
        });
      }

      setChartData(categoryTotals);
    };

    generateData();
  }, [timeFrame]);

  return (
    <div className="bg-white shadow-md rounded-2xl  p-4 sm:p-7 flex flex-col gap-2 sm:gap-4 w-full md:max-w-[50%]">
      <div className="flex justify-between items-center">
        <Text className=" text-base lg:text-xl text-black font-medium">
          Sales by Category
        </Text>
        <CustomDropdown
          options={["week", "month"]}
          selectedOption={timeFrame}
          onOptionSelect={setTimeFrame}
        />
      </div>
      <div className="flex gap-2 justify-between items-center w-[90%] xl:w-full">
        <div className="w-full xl:w-1/2">
          <PieChart
            width={280}
            height={240}
            style={{ width: "100%", height: "110%" }}
            className="xl:-ml-4"
          >
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={120}
              paddingAngle={1}
              dataKey="amount"
            >
              {chartData.map((_, index) => (
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
                chartData.reduce((acc, item) => acc + item.amount, 0) /
                chartData.length /
                1000
              ).toFixed(1)}k`}
            </text>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className="px-2.5 py-1 rounded-lg bg-[#8884d8] text-white text-sm font-medium flex xl:hidden flex-col">
                      <Text className=" text-sm">{payload[0].name}</Text>
                      <Text className=" font-semibold text-base">{`$${payload[0].value}`}</Text>
                    </div>
                  );
                }
                return null;
              }}
              offset={0}
            />
          </PieChart>
        </div>
        <div className="w-[50%] min-w-[260px] h-full hidden xl:flex flex-col justify-center gap-2 md:gap-3 max-w-[270px]">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm text-gray-600"
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <Text className="text-base font-medium text-black">
                    {item.name}
                  </Text>
                </div>
                <Text className="text-xs font-medium text-gray-600">{`${item.product?.toLocaleString()} Products`}</Text>
              </div>
              <Text className="text-base font-medium text-black">
                {`$${item.amount}`}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesByCategoryCard;
