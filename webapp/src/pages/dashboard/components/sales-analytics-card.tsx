import React, { useCallback, useState, useMemo } from "react";

import Text from "../../../components/text";
import CustomDropdown from "../../../components/custom-dropdown";
import { aggregateMonthlyData, generateAnalyticsData } from "../util/functions";
import SaleBarChart from "./charts/sales-bar";
import SalesAreaChart from "./charts/sales-area";

export interface IAnalyticsData {
  id: number;
  date: string;
  amount: number;
}

type TOptions = "week" | "month";

const SalesAnalyticsCard = () => {
  const [timeFrame, setTimeFrame] = useState<TOptions>("week");

  const fullData = useMemo(() => generateAnalyticsData(30), []);
  const chartData = useMemo(
    () =>
      timeFrame === "week"
        ? fullData.slice(-7)
        : aggregateMonthlyData(fullData),
    [timeFrame, fullData]
  );

  const handleOptionSelect = useCallback((val: string) => {
    setTimeFrame(val as TOptions);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-7 flex flex-col gap-4 w-full md:max-w-[50%]">
      <div className="flex justify-between items-center">
        <Text className="text-base lg:text-xl text-black font-medium">
          Sales Analytics
        </Text>
        <CustomDropdown
          options={["week", "month"]}
          selectedOption={timeFrame}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      <div className="flex items-center flex-grow">
        <div className="block lg:hidden">
          <SaleBarChart data={chartData} />
        </div>
        <div className="hidden lg:block">
          <SalesAreaChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsCard;
