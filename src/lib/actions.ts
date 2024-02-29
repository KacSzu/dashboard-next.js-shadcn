import { useQuery } from "@tanstack/react-query";
import {
  getLastYearProjects,
  getPaginatedProjects,
  getProjects,
} from "../api/apiOrders";
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
  console.log(filterBy);
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
