import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import Text from "../../../components/text";

const categoryColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#413ea0"];
const data = Array.from({ length: 30 }, (v, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const amount = Math.floor(Math.random() * 5000) + 1000; // Random sales amount between 1000 and 6000
  return {
    id: i + 1,
    date: date.toISOString().split("T")[0],
    amount: amount,
  };
}).reverse(); // Reverse to have the oldest date first

const SalesAnalyticsCard = () => {
  const [timeFrame, setTimeFrame] = React.useState("week");
  const [chartData, setChartData] = React.useState(data);

  React.useEffect(() => {
    const generateData = () => {
      const today = new Date();
      if (timeFrame === "week") {
        const lastWeekData = data.slice(-7);
        setChartData(lastWeekData);
      } else if (timeFrame === "month") {
        const monthData = [
          {
            id: 1,
            date: new Date(data[3].date).toISOString().split("T")[0],
            amount: data.slice(0, 7).reduce((sum, day) => sum + day.amount, 0),
          },
          {
            id: 2,
            date: new Date(data[10].date).toISOString().split("T")[0],
            amount: data.slice(7, 14).reduce((sum, day) => sum + day.amount, 0),
          },
          {
            id: 3,
            date: new Date(data[17].date).toISOString().split("T")[0],
            amount: data
              .slice(14, 21)
              .reduce((sum, day) => sum + day.amount, 0),
          },
          {
            id: 4,
            date: new Date(data[24].date).toISOString().split("T")[0],
            amount: data
              .slice(21, 28)
              .reduce((sum, day) => sum + day.amount, 0),
          },
          {
            id: 5,
            date: new Date(data[29].date).toISOString().split("T")[0],
            amount: data
              .slice(28, 30)
              .reduce((sum, day) => sum + day.amount, 0),
          },
        ];
        setChartData(monthData);
      }
    };

    generateData();
  }, [timeFrame]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-7 flex flex-col gap-4 w-full md:max-w-[50%]">
      <div className="flex justify-between items-center">
        <Text className="text-base sm:text-xl text-black font-medium">
          Sales Analytics
        </Text>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="border rounded-lg px-1.5 py-0.5 sm:px-3 sm:py-1 mx-1 text-xs sm:text-sm text-gray-700"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      <div className="flex items-center">
        <div className="block sm:hidden">
          <BarChart
            width={730}
            height={400}
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            className="-ml-2 sm:-ml-3"
            style={{ width: "100%", height: "94%" }}
          >
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="hidden sm:block">
          <AreaChart
            width={730}
            height={300}
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            className="-ml-2 sm:-ml-3"
            style={{ width: "100%", height: "94%" }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="9%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              padding={{ left: 5, right: 5 }}
              fontSize={12}
              tickLine={false}
              tickSize={15}
              tickFormatter={(date) => {
                const formattedDate = new Date(date);
                const monthNames = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                return `${monthNames[formattedDate.getMonth()]} ${String(
                  formattedDate.getDate()
                ).padStart(2, "0")}`;
              }}
            />
            <YAxis
              dataKey="amount"
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
              padding={{ top: 10, bottom: 10 }}
              fontSize={13}
              tickLine={false}
              tickSize={15}
            />
            <CartesianGrid
              strokeDasharray="6"
              vertical={false}
              fillOpacity={0.1}
              stroke="#8884d840"
            />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length) {
                  return (
                    <div className=" px-2.5 py-1 rounded-lg bg-[#8884d8] text-white text-sm font-medium">{`$${payload[0].value}`}</div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsCard;
