import ButtonGroup from "../ButtonGroup";
import {
  HiArrowSmallDown,
  HiArrowSmallUp,
  HiMagnifyingGlass,
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

interface IOrdersFilter {
  onSortByChange: (sortBy: string) => void;
  onFilterByChange: (filterBy: string) => void;
  sortBy: string;
}
function ProjectsFilter({
  onSortByChange,
  onFilterByChange,
  sortBy,
}: IOrdersFilter) {
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

  return (
    <div className="mx-[12px] my-4 flex justify-between">
      <Select onValueChange={onFilterByChange}>
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
      <div className="flex w-full max-w-sm items-center space-x-1 relative">
        <Input
          type="email"
          placeholder="Find by company name"
          className="pl-10"
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
