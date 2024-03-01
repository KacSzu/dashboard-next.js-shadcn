"use client";
import ActiveOrders from "./overview/ActiveOrders";
import ButtonGroup from "./ButtonGroup";
import CardGroup from "./overview/CardGroup";
import HeroChart from "@/components/overview/HeroChart";
import { useState } from "react";
import ProjectsTable from "./allOrders/ProjectsTable";
import BestMonthCard from "./analythics/BestMonthCard";
import TypeChart from "./analythics/TypeChart";
import CompareArea from "./analythics/CompareArea";
import NewProjectModal from "./dashboardHeader/NewProjectModal";
import { useProjects } from "@/lib/actions";
import Loader from "./Loader";
import { CalendarRangePicker } from "./dashboardHeader/CalendarRangePicker";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { data, error, isLoading } = useProjects();
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
  ];

  if (isLoading) return <Loader />;
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded  w-[1024px] h-[80%] lg:h-[750px]">
      <div className="flex flex-col gap-4">
        <header className="mx-[12px] mt-4 flex justify-between">
          <ButtonGroup
            activeTab={activeTab}
            data={HEADER_BUTTONS}
            setActiveTab={setActiveTab}
          />
          <NewProjectModal />
          <CalendarRangePicker />
        </header>
        <main>
          {activeTab === "overview" && (
            <>
              <section>
                <CardGroup projects={projects} count={count} />
              </section>
              <section className="flex gap-3 mt-3 mx-[11px]">
                <HeroChart />
                <ActiveOrders projects={projects?.slice(0, 6)} />
              </section>
            </>
          )}
          {activeTab === "allOrders" && (
            <section>
              <ProjectsTable count={count} />
            </section>
          )}
          {activeTab === "analythics" && (
            <section className="space-y-3">
              <div className="mx-[11px] flex gap-3 ">
                <TypeChart projects={projects} />
                <BestMonthCard projects={projects} />
                <BestMonthCard projects={projects} />
              </div>
              <div>
                <CompareArea />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
