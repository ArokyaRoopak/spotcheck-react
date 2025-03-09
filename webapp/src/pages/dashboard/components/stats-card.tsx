import Text from "../../../components/text";
import { useMemo } from "react";
import Icon from "../../../components/icons";
import { IconType } from "../../../components/icons/types";
import StatsAreaChart from "./charts/stats-area";

export interface StatsCardProps {
  label: string;
  data: number[];
  graphColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  data,
  graphColor = "#1a756a",
}) => {
  const todaysPerformanceVal = useMemo(() => {
    if (data.length < 2) return 0;
    const previous = data[data.length - 2] || 1;
    return ((data[data.length - 1] - previous) / Math.abs(previous)) * 100;
  }, [data]);

  const isNegative = todaysPerformanceVal < 1;

  return (
    <div className="bg-white shadow-md rounded-xl transition-all duration-300 border-2 border-[transparent] hover:border-primary/70 px-3 py-4 flex items-center gap-1 sm:gap-3 w-[48%] md:min-w-[240px] lg:min-w-[280px] 2xl:min-w-[320px] md:w-[240px] lg:w-[280px] 2xl:w-[320px]">
      <div className="flex flex-col gap-1 sm:gap-4 w-full sm:w-[58%]">
        <Text className="text-xs sm:text-sm text-gray-700 capitalize">
          {label.toUpperCase()}
        </Text>
        <Text className="text-xl sm:text-3xl font-bold text-gray-900 font-noto">
          {`$ ${data[data.length - 1].toLocaleString()}`}
        </Text>
        <div className="hidden sm:flex gap-1 items-center min-w-max">
          <Icon
            icon={IconType.TRENDING_UP}
            size="22"
            viewBox="0 0 28 24"
            color={`${
              isNegative ? "rotate-[80deg]" : ""
            } stroke-primary stroke-2`}
          />
          <Text className="flex text-sm font-medium gap-1 text-primary">
            {`${Math.abs(todaysPerformanceVal).toFixed(1)}%`}
          </Text>
          <Text className="text-xs text-gray-500 font-medium mt-0.5">
            vc yesterday
          </Text>
        </div>
      </div>
      <div className="w-[40%] h-full hidden sm:flex justify-center items-center">
        <StatsAreaChart
          data={data}
          graphColor={graphColor}
          isNegative={isNegative}
        />
      </div>
    </div>
  );
};

export default StatsCard;
