import ActiveOrders from "./ActiveOrders";
import ButtonGroup from "./ButtonGroup";
import CardGroup from "./CardGroup";
import HeroChart from "@/components/HeroChart";
import { CalendarPopover } from "./CalendarPopover";

function Dashboard() {
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded w-[1024px] h-[80%]">
      <div className="flex flex-col gap-4">
        <header className="mx-[12px] mt-4 flex justify-between">
          <ButtonGroup />
          <CalendarPopover />
        </header>
        <main>
          <section>
            <CardGroup />
          </section>
          <section className="flex gap-3 mt-3 mx-[11px]">
            <HeroChart />
            <ActiveOrders />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
