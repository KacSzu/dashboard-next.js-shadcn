import { supabase } from "../lib/supabaseClient";

interface IGetOrders {
  filter?: string;
  page?: number;
  sortBy?: string;
}
export async function getProjects() {
  let { data, error, count } = await supabase
    .from("projects")
    .select("*", { count: "exact" });

  if (error) throw new Error("Projects could not be loaded.");
  return { data, count };
}

export async function getLastYearProjects() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Konwersja daty na format rozumiany przez Supabase (ISO 8601)
  const oneYearAgoISO = oneYearAgo.toISOString();

  let { data, error } = await supabase
    .from("projects")
    .select("*")
    // Użyj .gte do filtracji daty "created_at" tak, aby uwzględniać projekty z ostatniego roku
    .gte("created_at", oneYearAgoISO);

  // Obsługa błędów
  if (error) {
    console.error("Błąd podczas pobierania projektów: ", error);
    return null;
  }

  return data;
}
