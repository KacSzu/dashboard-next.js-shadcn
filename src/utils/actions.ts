import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewProject,
  deleteProject as deleteProjectApi,
  getLastYearProjects,
  getPaginatedProjects,
  getProjects,
  updateProject as updateProjectApi,
} from "../api/apiProjects";
import toast from "react-hot-toast";
import { TProject } from "./schema";
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
    mutationFn: (newProject: TProject) => createNewProject(newProject),
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

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: (projectId: number) => deleteProjectApi(projectId),
    mutationKey: ["projects"],
    onSuccess: () => {
      toast.success("Project deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Project could not be deleted");
    },
  });
  return { deleteProject, isPending };
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: ({
      projectId,
      updatedProjectData,
    }: {
      projectId: number;
      updatedProjectData: TProject;
    }) => updateProjectApi(projectId, updatedProjectData),
    mutationKey: ["projects"],
    onSuccess: () => {
      toast.success("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Project could not be updated");
    },
  });
  return { updateProject, isPending };
}
