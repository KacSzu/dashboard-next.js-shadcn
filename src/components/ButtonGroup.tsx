"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
interface IButtonGroup {
  setActiveTab?: (actitveTab: string) => void;
  data: {
    title: string;
    value: string;
  }[];
  activeTab?: string;
}
function ButtonGroup({ data, setActiveTab, activeTab }: IButtonGroup) {
  return (
    <div className="rounded  max-w-fit ">
      <div className="space-x-1 bg-muted px-2 py-1 rounded ">
        {data.map((option) => {
          const isActive = activeTab === option.value;
          return (
            <Button
              size="sm"
              className={cn(
                "h-7 bg-muted hover:bg-muted  text-foreground ",
                isActive && " bg-background shadow-sm"
              )}
              key={option.title}
              onClick={() => setActiveTab?.(option.value)}
            >
              {option.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonGroup;
