"use client";
import { Button } from "./ui/button";
interface IButtonGroup {
  setActiveTab?: (actitveTab: string) => void;
  data: {
    title: string;
    value: string;
  }[];
}
function ButtonGroup({ data, setActiveTab }: IButtonGroup) {
  return (
    <div className="rounded  max-w-fit ">
      <div className="space-x-1 bg-muted px-2 py-1 rounded ">
        {data.map((option) => (
          <Button
            size="sm"
            className="h-7 bg-muted hover:bg-background text-foreground hover:sha"
            key={option.title}
            onClick={() => setActiveTab?.(option.value)}
          >
            {option.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
