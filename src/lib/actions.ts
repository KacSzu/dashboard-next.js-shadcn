import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewProject,
  getLastYearProjects,
  getPaginatedProjects,
  getProjects,
} from "../api/apiOrders";
import toast from "react-hot-toast";
import { TNewProject } from "./schema";
export function useProjects() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
  return { data, error, isLoading };
}
interface IUsePaginatedProjects {
  currentPage: number;
  sortBy: string;
  filterBy: string;
}
export function usePaginatedProjects({
  currentPage,
  sortBy,
  filterBy,
}: IUsePaginatedProjects) {
  const [field, direction] = sortBy.split("-");
  const [filterField, value] = filterBy.split("-");
  const { data, error, isFetched } = useQuery({
    queryKey: ["projects", currentPage, sortBy, filterBy],
    queryFn: () =>
      getPaginatedProjects({
        currentPage,
        sortBy: { field, direction },
        filterBy: { filterField, value },
      }),
  });
  return { data, error, isFetched };
}
export function useLastYearProjects() {
  const { data, error, isFetched } = useQuery({
    queryKey: [`projects last-365`],
    queryFn: getLastYearProjects,
  });
  return { data, error, isFetched };
}

export function useCreateNewProject() {
  const queryClient = useQueryClient();
  const { mutate: createProject, isPending } = useMutation({
    mutationFn: (newProject: TNewProject) => createNewProject(newProject),
    mutationKey: ["projects"],
    onSuccess: () => {
      toast.success("New project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects last-365"] });
    },
    onError: () => {
      toast.error("New project could not be created");
    },
  });
  return { createProject, isPending };
}
