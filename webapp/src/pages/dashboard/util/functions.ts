import { IAnalyticsData } from "../components/sales-analytics-card";
import { Categories, DailySalesEntry } from "../components/sales-category-card";

export const generateAnalyticsData = (days: number): IAnalyticsData[] =>
  Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      id: i + 1,
      date: date.toISOString().split("T")[0],
      amount: Math.floor(Math.random() * 5000) + 1000,
    };
  }).reverse();

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleString("default", { month: "short" })} ${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

export const aggregateMonthlyData = (
  data: IAnalyticsData[]
): IAnalyticsData[] => {
  const groupedData = [];
  for (let i = 0; i < data.length; i += 7) {
    const chunk = data.slice(i, i + 7);
    groupedData.push({
      id: groupedData.length + 1,
      date: chunk[0].date,
      amount: chunk.reduce((sum, entry) => sum + entry.amount, 0),
    });
  }
  return groupedData;
};

export const generateSalesData = (days: number): DailySalesEntry[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      id: i + 1,
      date: date.toISOString().split("T")[0],
      data: Categories.map((category) => ({
        name: category,
        amount: Math.floor(Math.random() * 5000) + 1000,
        product: Math.floor(Math.random() * 1000) + 1,
      })),
    };
  }).reverse();
};
