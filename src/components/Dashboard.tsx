"use client";
import RecentProjects from "./overview/RecentProjects";
import ButtonGroup from "./ButtonGroup";
import CardGroup from "./overview/CardGroup";
import HeroChart from "@/components/overview/HeroChart";
import { useState } from "react";
import ProjectsTable from "./allOrders/ProjectsTable";
import BestMonthCard from "./analythics/BestMonthCard";
import TypeChart from "./analythics/TypeChart";
import CompareArea from "./analythics/CompareArea";
import NewProjectModal from "./dashboardHeader/NewProjectModal";
import { useProjects } from "@/utils/actions";
import Loader from "./Loader";
import WaitingProjectsCard from "./development/WaitingProjectsCard";
import ActiveProjectsCard from "./development/ActiveProjectsCard";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { data, isLoading } = useProjects();
  const projects = data?.data;
  const count = data?.count;
  const HEADER_BUTTONS = [
    {
      title: "Overwiev",
      value: "overview",
    },
    {
      title: "All orders",
      value: "allOrders",
    },
    {
      title: "Analythics",
      value: "analythics",
    },
    {
      title: "Development",
      value: "development",
    },
  ];

  if (isLoading) return <Loader />;
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded  max-w-5xl h-[680px] ">
      <div className="flex flex-col gap-4">
        <header className="mx-[12px] mt-4 flex justify-between">
          <ButtonGroup
            activeTab={activeTab}
            data={HEADER_BUTTONS}
            setActiveTab={setActiveTab}
          />
          <NewProjectModal />
        </header>
        <main className=" mx-[12px]">
          {activeTab === "overview" && (
            <div className="space-y-1">
              <section>
                <CardGroup projects={projects} count={count} />
              </section>
              <section className="grid grid-cols-12 gap-1 ">
                <div className="col-span-8 ">
                  <HeroChart />
                </div>
                <div className="col-span-4  ">
                  <RecentProjects projects={projects?.slice(0, 5)} />
                </div>
              </section>
            </div>
          )}
          {activeTab === "allOrders" && (
            <section>
              <ProjectsTable />
            </section>
          )}
          {activeTab === "analythics" && (
            <div className="space-y-1">
              <section className="grid grid-cols-12 gap-1">
                <TypeChart projects={projects} />
                <BestMonthCard projects={projects} />
                <BestMonthCard projects={projects} />
              </section>
              <section className="col-span-12">
                <CompareArea />
              </section>
            </div>
          )}
          {activeTab === "development" && (
            <section className="grid grid-cols-12 gap-1 ">
              <WaitingProjectsCard />
              <ActiveProjectsCard />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
