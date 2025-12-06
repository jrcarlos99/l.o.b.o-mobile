import { OccurrenceFilters } from "@/types/OccurrenceFilters";

export function normalizeRegionFilter(
  value: string | undefined
): OccurrenceFilters["regiao"] {
  if (!value) return undefined;

  const v = value.trim().toUpperCase();

  if (v === "TODOS") return "todos";
  if (["RMR", "AGRE", "ZDMT", "SERT"].includes(v)) {
    return v as OccurrenceFilters["regiao"];
  }

  return undefined;
}
