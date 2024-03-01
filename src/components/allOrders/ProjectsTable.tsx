"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatCurrency, trimZerosFromCurrency } from "@/lib/utils";
import { usePaginatedProjects } from "@/lib/actions";
import { useState } from "react";
import ProjectsFilter from "./ProjectsFilter";

export default function ProjectsTable() {
  const [sortBy, setSortBy] = useState<string>("created_at-desc");
  const [filterBy, setFilterBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isFetched } = usePaginatedProjects({
    currentPage,
    sortBy,
    filterBy,
  });
  const projects = data?.data;
  const count = data?.count;
  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleSortByChange = (sortBy: string) => {
    setSortBy(sortBy);
  };
  const handleFilterByChange = (filterBy: string) => {
    setFilterBy(`projectType-${filterBy}`);
  };
  const handleResetFilter = (filterBy: string) => {
    setFilterBy("");
  };

  return (
    <div className="max-w-[950px] mx-auto">
      <div>
        <ProjectsFilter
          sortBy={sortBy}
          onFilterByChange={handleFilterByChange}
          onSortByChange={handleSortByChange}
          onPageChange={handleChangePage}
          onResetFilter={handleResetFilter}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Avatar</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right capitalize">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="text-left">
                <Avatar>
                  <AvatarImage src={project.avatar} alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.email}</TableCell>
              <TableCell>
                {trimZerosFromCurrency(formatCurrency(project.price))}
              </TableCell>
              <TableCell className="text-right capitalize">
                {project.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="mt-4">
        <TablePagination
          count={count}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}
