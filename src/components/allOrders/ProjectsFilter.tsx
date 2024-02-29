import ButtonGroup from "../ButtonGroup";
import { HiArrowSmallDown, HiArrowSmallUp } from "react-icons/hi2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IOrdersFilter {
  onSortByChange: (sortBy: string) => void;
  onFilterByChange: (filterBy: string) => void;
}
function ProjectsFilter({ onSortByChange, onFilterByChange }: IOrdersFilter) {
  const FILTER_BUTTONS = [
    {
      title: "Price ",
      icon: <HiArrowSmallDown className="h-4 w-4" />,
      value: "price-desc",
    },
    {
      title: "Price",
      icon: <HiArrowSmallUp className="h-4 w-4" />,
      value: "price-asc",
    },
    {
      title: "Date",
      icon: <HiArrowSmallDown className="h-4 w-4" />,
      value: "created_at-desc",
    },
    {
      title: "Date",
      icon: <HiArrowSmallUp className="h-4 w-4" />,
      value: "created_at-asc",
    },
  ];

  return (
    <div className="mx-[12px] my-4 flex justify-between">
      <Select onValueChange={onFilterByChange}>
        <SelectTrigger className="w-[200px]">
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
      <ButtonGroup onSortByChange={onSortByChange} data={FILTER_BUTTONS} />
    </div>
  );
}

export default ProjectsFilter;
