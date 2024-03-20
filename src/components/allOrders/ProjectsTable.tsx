"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { formatCurrency, trimZerosFromCurrency } from "@/utils/utils";
import { useDeleteProject, usePaginatedProjects } from "@/utils/actions";
import { useState } from "react";
import ProjectsFilter from "./ProjectsFilter";
import Loader from "../Loader";
import { HiOutlineTrash } from "react-icons/hi2";
import UpdateProjectModal from "./UpdateProjectModal";

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
  const isFetching = !isFetched || isPending;
  return (
    <div>
      <div>
        <ProjectsFilter
          onSearchQueryChange={handleSearchQuery}
          sortBy={sortBy}
          onFilterByChange={handleFilterByChange}
          onSortByChange={handleSortByChange}
          onPageChange={handleChangePage}
          onResetFilter={handleResetFilter}
        />
      </div>
      {isFetching && <Loader />}

      {!isFetching && (
        <div className="h-[55vh] mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Avatar</TableHead>
                <TableHead>Project Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="capitalize">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="capitalize">{project.status}</TableCell>
                  <TableCell className="flex justify-end items-center py-6 ">
                    <UpdateProjectModal project={project} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <HiOutlineTrash className="ml-4  h-5 w-5 cursor-pointer" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your project and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProject(project.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="mt-4 ">
            <TablePagination
              count={count}
              currentPage={currentPage}
              onChangePage={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
