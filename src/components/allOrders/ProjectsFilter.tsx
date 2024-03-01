"use client";
import ButtonGroup from "../ButtonGroup";
import {
  HiArrowSmallDown,
  HiArrowSmallUp,
  HiMagnifyingGlass,
  HiXMark,
} from "react-icons/hi2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useState } from "react";

interface IOrdersFilter {
  onSortByChange: (sortBy: string) => void;
  onFilterByChange: (filterBy: string) => void;
  sortBy: string;
  onPageChange: (newPage: number) => void;
  onResetFilter: (filterBy: string) => void;
}
const FILTER_BUTTONS = [
  {
    title: "Price",
    icon: <HiArrowSmallUp className="h-4 w-4" />,
    value: "price-asc",
  },
  {
    title: "Price ",
    icon: <HiArrowSmallDown className="h-4 w-4" />,
    value: "price-desc",
  },
  {
    title: "Date",
    icon: <HiArrowSmallUp className="h-4 w-4" />,
    value: "created_at-asc",
  },
  {
    title: "Date",
    icon: <HiArrowSmallDown className="h-4 w-4" />,
    value: "created_at-desc",
  },
];
function ProjectsFilter({
  onSortByChange,
  onFilterByChange,
  sortBy,
  onPageChange,
  onResetFilter,
}: IOrdersFilter) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (filterBy: string) => {
    setSelectedFilter(filterBy);
    onFilterByChange(filterBy);
    onPageChange(1);
  };

  const handleResetFilter = () => {
    setSelectedFilter("");
    onResetFilter("");
    onPageChange(1);
  };

  return (
    <div className="mx-[12px] my-4 flex justify-between items-center ">
      <div className="flex items-center gap-2">
        <HiXMark
          onClick={handleResetFilter}
          className="cursor-pointer flex-start mr-0.5"
        />
        <Select value={selectedFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[200px] ">
            <SelectValue placeholder="Select a project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Project types</SelectLabel>
              <SelectItem value="web_page">Web Page</SelectItem>
              <SelectItem value="store">Store</SelectItem>
              <SelectItem value="application">Application</SelectItem>
              <SelectItem value="integration">Integration</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-fit max-w-sm items-center space-x-1 relative">
        <Input
          type="text"
          placeholder="Find by company name"
          className="pl-9"
        />
        <button type="submit" className="absolute left-2">
          <HiMagnifyingGlass className="h-5 w-5" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <ButtonGroup
          sortBy={sortBy}
          onSortByChange={onSortByChange}
          data={FILTER_BUTTONS}
        />
      </div>
    </div>
  );
}

export default ProjectsFilter;
