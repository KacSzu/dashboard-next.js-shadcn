"use client";
import { Table, TableBody } from "@/components/ui/table";
import TablePagination from "./TablePagination";
import { useDeleteProject, usePaginatedProjects } from "@/utils/actions";
import { useState } from "react";
import ProjectsFilter from "./ProjectsFilter";
import ProjectTableHeader from "./ProjectsTableHeader";
import ProjectRow from "./ProjectRow";
import ProjectTableFooter from "./ProjectsTableFooter";

export default function ProjectsTable() {
  const [sortBy, setSortBy] = useState<string>("created_at-desc");
  const [filterBy, setFilterBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isFetched } = usePaginatedProjects({
    currentPage,
    sortBy,
    filterBy,
    searchQuery,
  });
  const { deleteProject, isPending } = useDeleteProject();
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
  const handleResetFilter = () => {
    setFilterBy("");
  };
  const handleSearchQuery = (companyName: string) => {
    setSearchQuery(companyName);
  };
  const totalPrice =
    projects?.reduce((sum, project) => sum + project.price, 0) || 0;
  const isFetching = !isFetched || isPending;
  return (
    <div>
      <ProjectsFilter
        onSearchQueryChange={handleSearchQuery}
        sortBy={sortBy}
        onFilterByChange={handleFilterByChange}
        onSortByChange={handleSortByChange}
        onPageChange={handleChangePage}
        onResetFilter={handleResetFilter}
      />
      <div className="h-[55vh] mt-4">
        <Table>
          <ProjectTableHeader />
          <TableBody>
            {projects?.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                deleteProject={deleteProject}
              />
            ))}
          </TableBody>
          <ProjectTableFooter totalPrice={totalPrice} />
        </Table>
        <TablePagination
          count={count}
          currentPage={currentPage}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
}
