import React, { useState, useMemo, useCallback } from "react";
import Text from "../../../components/text";
import CustomDropdown from "../../../components/custom-dropdown";
import { generateSalesData } from "../util/functions";
import SalesPieChart, { COLORS } from "./charts/sales-pie";

export interface CategoryData {
  name: string;
  amount: number;
  product: number;
}

export interface DailySalesEntry {
  id: number;
  date: string;
  data: CategoryData[];
}

type TOptions = "week" | "month";

export const Categories = [
  "Category A",
  "Category B",
  "Category C",
  "Category D",
  "Category E",
];

const aggregateSalesData = (
  data: DailySalesEntry[],
  days: number
): CategoryData[] => {
  const categoryTotals = Categories.map((name) => ({
    name,
    amount: 0,
    product: 0,
  }));

  data.slice(-days).forEach((entry) => {
    entry.data.forEach((item) => {
      const category = categoryTotals.find((cat) => cat.name === item.name);
      if (category) {
        category.amount += item.amount;
        category.product += item.product;
      }
    });
  });

  return categoryTotals;
};

const SalesByCategoryCard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TOptions>("week");
  const fullData = useMemo(() => generateSalesData(30), []);
  const chartData = useMemo(
    () => aggregateSalesData(fullData, timeFrame === "week" ? 7 : 30),
    [timeFrame, fullData]
  );

  const handleOptionSelect = useCallback((val: string) => {
    setTimeFrame(val as TOptions);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-7 flex flex-col gap-2 sm:gap-4 w-full md:max-w-[50%]">
      <div className="flex justify-between items-center">
        <Text className="text-base lg:text-xl text-black font-medium">
          Sales by Category
        </Text>
        <CustomDropdown
          options={["week", "month"]}
          selectedOption={timeFrame}
          onOptionSelect={handleOptionSelect}
        />
      </div>
      <div className="flex gap-2 justify-between items-center w-[90%] xl:w-full">
        <div className="w-full xl:w-1/2">
          <SalesPieChart data={chartData} />
        </div>
        {/* can be made a separate component, if needed. Im not doing it for now */}
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
                <Text className="text-xs font-medium text-gray-600">{`${item.product.toLocaleString()} Products`}</Text>
              </div>
              <Text className="text-base font-medium text-black">{`$${item.amount}`}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesByCategoryCard;
