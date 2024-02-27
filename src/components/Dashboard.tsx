import ButtonGroup from "./ButtonGroup";
import CardGroup from "./CardGroup";

function Dashboard() {
  return (
    <div className="shadow-md mx-auto bg-background border border-muted rounded w-[1024px] h-[80%]">
      <div className="flex flex-col gap-5">
        <ButtonGroup />
        <CardGroup />
      </div>
    </div>
  );
}

export default Dashboard;
