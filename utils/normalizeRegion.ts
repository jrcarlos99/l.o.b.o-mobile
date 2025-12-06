export function normalizeRegion(value: string | undefined) {
  if (!value) return undefined;

  const region = value.trim().toUpperCase();

  const allowed = ["RMR", "AGRE", "ZDMT", "SERT"] as const;

  return allowed.includes(region as any)
    ? (region as (typeof allowed)[number])
    : undefined;
}
