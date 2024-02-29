import { useQuery } from "@tanstack/react-query";
import {
  getLastYearProjects,
  getProjects as getProjectsApi,
} from "../api/apiOrders";
export function useProjects() {
  const { data, error, isFetched } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsApi(),
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
