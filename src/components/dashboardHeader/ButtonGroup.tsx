"use client";
import { cn } from "@/utils/utils";
import { Button } from "../ui/button";
import { ReactNode } from "react";
interface IButtonGroup {
  setActiveTab?: (actitveTab: string) => void;
  data: {
    title: string;
    icon?: ReactNode;
    value: string;
  }[];
  activeTab?: string;
  onSortByChange?: (sortBy: string) => void;
  sortBy?: string;
}
function ButtonGroup({
  data,
  setActiveTab,
  activeTab,
  onSortByChange,
  sortBy,
}: IButtonGroup) {
  return (
    <div className="rounded  max-w-fit ">
      <div className="space-x-1 bg-muted px-2 py-1 rounded ">
        {data.map((option) => {
          const isActiveTab = activeTab === option.value;
          const isActiveSortBy = sortBy === option.value;

          return (
            <Button
              size="sm"
              className={cn(
                "h-7 bg-muted hover:bg-muted    text-foreground ",
                isActiveTab && " bg-background shadow-sm",
                isActiveSortBy && " bg-background shadow-sm"
              )}
              key={option.value}
              onClick={() => {
                onSortByChange?.(option.value);
                setActiveTab?.(option.value);
              }}
            >
              {option.title}
              {option?.icon ? option.icon : null}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default ButtonGroup;
