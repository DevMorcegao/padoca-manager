import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { SalesOverview } from "@/components/dashboard/sales-overview";
import { StockAlerts } from "@/components/dashboard/stock-alerts";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />
      <div className="grid gap-8 md:grid-cols-2">
        <SalesOverview />
        <StockAlerts />
      </div>
      <RecentOrders />
    </div>
  );
}