"use client";

import { DashboardHeader } from "@/components/features/dashboard/dashboard-header";
import { RecentOrders } from "@/components/features/dashboard/recent-orders";
import { SalesOverview } from "@/components/features/dashboard/sales-overview";
import { StockAlerts } from "@/components/features/dashboard/stock-alerts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader />
      <div className="grid gap-4 md:grid-cols-2">
        <SalesOverview />
        <StockAlerts />
      </div>
      <RecentOrders />
    </div>
  );
}
