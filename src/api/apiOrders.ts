import { PAGE_SIZE } from "@/lib/constants";
import { supabase } from "../lib/supabaseClient";
export async function getProjects() {
  let query = supabase.from("projects").select("*", { count: "exact" });

  const { data, error, count } = await query;
  if (error) throw new Error("Projects could not be loaded.");

  return { data, count };
}
interface getPaginatedProjects {
  currentPage?: number;
  sortBy: { field: string; direction: string };
  filterBy: { filterField: string; value: string };
}
export async function getPaginatedProjects({
  currentPage,
  sortBy,
  filterBy,
}: getPaginatedProjects) {
  let query = supabase.from("projects").select("*", { count: "exact" });
  if (filterBy) query = query.eq(filterBy.filterField, filterBy.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error("Projects could not be loaded.");

  return { data, count };
}
export async function getLastYearProjects() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const oneYearAgoISO = oneYearAgo.toISOString();

  let { data, error } = await supabase
    .from("projects")
    .select("*")
    .gte("created_at", oneYearAgoISO);

  if (error) {
    throw new Error("Projects could not be loaded.");
  }

  return data;
}
