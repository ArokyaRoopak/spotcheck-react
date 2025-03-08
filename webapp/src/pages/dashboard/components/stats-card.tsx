import { ResponsiveContainer, AreaChart, Area } from "recharts";
import Text from "../../../components/text";
import { useMemo } from "react";
import Icon from "../../../components/icons";
import { IconType } from "../../../components/icons/types";

interface StatsCardProps {
  label: string;
  data: number[];
  graphColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  data,
  graphColor = "#1a756a",
}) => {
  const todaysPerformanceVal = useMemo(
    () =>
      ((data[data.length - 1] - data[data.length - 2]) /
        Math.abs(data[data.length - 2])) *
      100,
    [data]
  );

  return (
    <div
      className="bg-white shadow-md rounded-xl px-3 py-4 flex items-center gap-1 sm:gap-3 w-[48%]  md:min-w-[240px] lg:min-w-[280px] 2xl:min-w-[320px] md:w-[240px] lg:w-[280px] 2xl:w-[320px]"
      key={`${label} ${todaysPerformanceVal}`}
    >
      <div className="flex flex-col gap-1 sm:gap-4 w-full sm:w-[58%]">
        <Text className="text-xs sm:text-sm text-gray-700 capitalize">
          {label?.toUpperCase()}
        </Text>
        <Text className="text-xl sm:text-3xl font-bold text-gray-900 font-noto">{`$ ${data[
          data.length - 1
        ].toLocaleString()}`}</Text>
        <div className="hidden sm:flex gap-1 items-center min-w-max">
          <Icon
            icon={IconType.TRENDING_UP}
            size="22"
            viewBox="0 0 28 24"
            color={`${
              todaysPerformanceVal > 0 ? "" : "rotate-90  inverse"
            } stroke-primary stroke-2`}
          />
          <Text className="flex text-sm font-medium gap-1 text-primary">
            {`${Math.abs(todaysPerformanceVal).toFixed(1)}%`}
          </Text>
          <Text className="text-xs text-gray-500 font-medium mt-0.5   ">
            vc yesterday
          </Text>
        </div>
      </div>
      <div
        className="w-[40%] h-full hidden sm:flex justify-center items-center"
        key={`${label}-todaysPerformanceVal${todaysPerformanceVal}`}
      >
        <ResponsiveContainer width="80%" height={"75%"}>
          <AreaChart data={data.map((y, x) => ({ x, y }))}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={graphColor} stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="error-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={"#D22B2B"} stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="y"
              stroke={todaysPerformanceVal < 1 ? "#D22B2B" : graphColor}
              fill={
                todaysPerformanceVal < 1
                  ? `url(#error-gradient)`
                  : `url(#gradient)`
              }
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsCard;
