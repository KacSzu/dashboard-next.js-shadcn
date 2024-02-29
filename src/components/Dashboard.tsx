"use client";
import ActiveOrders from "./overview/ActiveOrders";
import ButtonGroup from "./ButtonGroup";
import CardGroup from "./overview/CardGroup";
import HeroChart from "@/components/overview/HeroChart";
import { CalendarPopover } from "./dashboardHeader/CalendarPopover";
import { useState } from "react";
import OrdersTable from "./allOrders/OrdersTable";
import OrdersFilter from "./allOrders/OrdersFilter";
import BestMonthCard from "./analythics/BestMonthCard";
import TypeChart from "./analythics/TypeChart";
import CompareArea from "./analythics/CompareArea";
import { NewOrderModal } from "./dashboardHeader/NewOrderModal";
import { useLastYearProjects, useProjects } from "@/lib/actions";
import Loader from "./Loader";

function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { data, error, isFetched } = useProjects();

  const projects = data?.data;
  const count = data?.count;
  console.log(data, error, isFetched);
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

  if (!isFetched) return <Loader />;
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded  w-[1024px] h-[80%] lg:h-[750px]">
      <div className="flex flex-col gap-4">
        <header className="mx-[12px] mt-4 flex justify-between">
          <ButtonGroup
            activeTab={activeTab}
            data={HEADER_BUTTONS}
            setActiveTab={setActiveTab}
          />
          <NewOrderModal />
          <CalendarPopover />
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
              <OrdersFilter />
              <OrdersTable />
            </section>
          )}
          {activeTab === "analythics" && (
            <section className="space-y-3">
              <div className="mx-[11px] flex gap-3 ">
                <TypeChart />
                <BestMonthCard />
                <BestMonthCard />
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
