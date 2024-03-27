"use client";
import { useState } from "react";
import { useProjects } from "@/utils/actions";
import Loader from "./Loader";
import { DASHBOARD_NAVIGATION } from "@/utils/constants";
import OverviewTab from "./overview/OverviewTab";
import AllOrdersTab from "./allOrders/AllOrdersTab";
import AnalyticsTab from "./analythics/AnalyticsTab";
import DevelopmentTab from "./development/DevelopmentTab";
import DashboardHeader from "./dashboardHeader/DashboardHeader";
export type Project = {
  avatar: string;
  created_at: string;
  email: string;
  id: number;
  name: string;
  price: number;
  projectType: string;
  status: string;
};
function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { data, isLoading } = useProjects();
  const projects = data?.data;
  const count = data?.count;

  if (isLoading) return <Loader />;
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded max-w-5xl h-[680px]">
      <div className="flex flex-col gap-4">
        <DashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={DASHBOARD_NAVIGATION}
        />
        <main className="mx-[12px]">
          {activeTab === "overview" && (
            <OverviewTab projects={projects} count={count} />
          )}
          {activeTab === "allOrders" && <AllOrdersTab />}
          {activeTab === "analythics" && <AnalyticsTab projects={projects} />}
          {activeTab === "development" && <DevelopmentTab />}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
