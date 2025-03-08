import React from "react";
import StatsCard from "./components/stats-card";
import SalesAnalyticsCard from "./components/sales-analytics-card";
import SalesByCategoryCard from "./components/sales-category-card";
import PurchaseTable from "./components/purchase-table";

const revenueData = [
  2000, 2100, 1900, 2200, 2250, 2180, 2300, 2400, 2500, 2600,
];
const visitorsData = [450, 800, 470, 580, 330, 790, 550, 600, 500, 310];
const transcation = [450, 800, 870, 780, 330, 590, 550, 600, 500, 910];
const products = [450, 800, 470, 580, 330, 790, 550, 600, 600, 310];

const Dashboard = () => {
  return (
    <div className="w-full  min-h-full overflow-auto flex flex-col  gap-3 sm:gap-6 py-2 sm:py-4">
      {/* stats */}
      <div className="flex w-full flex-wrap gap-2 sm:gap-6 px-1">
        <StatsCard label="Today Revenue" data={revenueData} />
        <StatsCard label="Today Visitors" data={visitorsData} />
        <StatsCard label="Today Transac" data={transcation} />
        <StatsCard label="Today Product" data={products} />
      </div>
      {/* graphs */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full px-1">
        <SalesAnalyticsCard />
        <SalesByCategoryCard />
      </div>
      {/* table */}
      <div className="px-1">
        <PurchaseTable />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Dashboard;
