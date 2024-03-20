import { PAGE_SIZE } from "@/utils/constants";
import { supabase } from "../utils/supabaseClient";
import { TProject } from "@/utils/schema";

export async function getProjects() {
  let query = supabase.from("projects").select("*", { count: "exact" });

  const { data, error, count } = await query;
  if (error) {
    console.error("Loading projects went wrong:", error.message);
    throw new Error("Projects could not be loaded.");
  }

  return { data, count };
}
interface getPaginatedProjects {
  currentPage?: number;
  sortBy: { field: string; direction: string };
  filterBy: { filterField: string; value: string };
  searchQuery?: string;
}
export async function getPaginatedProjects({
  currentPage,
  sortBy,
  filterBy,
  searchQuery,
}: getPaginatedProjects) {
  let query = supabase.from("projects").select("*", { count: "exact" });

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`);
  }

  if (filterBy) {
    query = query.eq(filterBy.filterField, filterBy.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error("Loading projects went wrong:", error.message);
    throw new Error("Projects could not be loaded.");
  }

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
    console.error("Loading projects went wrong:", error.message);
    throw new Error("Projects could not be loaded.");
  }

  return data;
}
export async function getProjectsByStatus(status: string) {
  let { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", status);

  if (error) {
    console.error("Loading projects went wrong:", error.message);
    throw new Error("Projects could not be loaded.");
  }

  return projects;
}
export async function createNewProject(newProject: TProject) {
  const { data, error } = await supabase.from("projects").insert([
    {
      projectType: newProject.projectType,
      price: newProject.price,
      name: newProject.name,
      avatar: newProject.avatar,
      email: newProject.email,
    },
  ]);

  if (error) {
    console.error("Error creating new project:", error.message);
    throw new Error("Could not create new project.");
  }

  return data;
}

export async function deleteProject(projectId: number) {
  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);
  if (error) throw new Error("Project could not be deleted.");
  return data;
}

export async function updateProject(
  projectId: number,
  updatedProjectData: TProject
) {
  const { data, error } = await supabase
    .from("projects")
    .update({
      projectType: updatedProjectData.projectType,
      price: updatedProjectData.price,
      name: updatedProjectData.name,
      avatar: updatedProjectData.avatar,
      email: updatedProjectData.email,
    })
    .match({ id: projectId });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function updateProjectStatus(
  projectId: number,
  newStatus: string
) {
  const { data, error } = await supabase
    .from("projects")
    .update({ status: newStatus })
    .eq("id", projectId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
