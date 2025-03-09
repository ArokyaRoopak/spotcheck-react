import React from "react";
import StatsCard from "./components/stats-card";
import SalesAnalyticsCard from "./components/sales-analytics-card";
import SalesByCategoryCard from "./components/sales-category-card";
import PurchaseTable from "./components/purchase-table";
import {
  ProductsData,
  RevenueData,
  TranscationData,
  VisitorsData,
} from "./util/data";

const Dashboard = () => {
  return (
    <div className="w-full  min-h-full overflow-auto flex flex-col  gap-3 sm:gap-6 py-2 sm:py-4">
      <div className="flex w-full flex-wrap gap-2 sm:gap-6 px-1">
        <StatsCard label="Today Revenue" data={RevenueData} />
        <StatsCard label="Today Visitors" data={VisitorsData} />
        <StatsCard label="Today Transac" data={TranscationData} />
        <StatsCard label="Today Product" data={ProductsData} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full px-1">
        <SalesAnalyticsCard />
        <SalesByCategoryCard />
      </div>
      <div className="px-1">
        <PurchaseTable />
      </div>
      <div className=""></div>
    </div>
  );
};

export default Dashboard;
