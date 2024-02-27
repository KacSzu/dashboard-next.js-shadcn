"use client";
import ActiveOrders from "./ActiveOrders";
import ButtonGroup from "./ButtonGroup";
import CardGroup from "./CardGroup";
import HeroChart from "@/components/HeroChart";
import { CalendarPopover } from "./CalendarPopover";
import { useState } from "react";
import OrdersTable from "./OrdersTable";
import OrdersFilter from "./OrdersFilter";
import BestMonthCard from "./BestMonthCard";
import TypeChart from "./TypeChart";
import CompareArea from "./CompareArea";

function Dashboard() {
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

  const [activeTab, setActiveTab] = useState<string>("");
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded w-[1024px] h-[80%]">
      <div className="flex flex-col gap-4">
        <header className="mx-[12px] mt-4 flex justify-between">
          <ButtonGroup data={HEADER_BUTTONS} setActiveTab={setActiveTab} />
          <CalendarPopover />
        </header>
        <main>
          {activeTab === "overview" && (
            <>
              <section>
                <CardGroup />
              </section>
              <section className="flex gap-3 mt-3 mx-[11px]">
                <HeroChart />
                <ActiveOrders />
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
