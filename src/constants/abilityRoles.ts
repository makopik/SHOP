import type { AbilityRole } from "@constants/abilityTypes.ts";

export const getAdminRoles = (): AbilityRole[] => [
  { action: "read", subject: "Product" },
  { action: "create", subject: "Product" },
  { action: "delete", subject: "Product" },
  { action: "manage", subject: "Cart" },
];

export const getUserRoles = (): AbilityRole[] => [
  { action: "read", subject: "Product" },
  { action: "manage", subject: "Cart" },
];
