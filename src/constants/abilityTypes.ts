import type { PureAbility } from "@casl/ability";

export type Actions = "read" | "create" | "delete" | "manage";
export type Subject = "Product" | "Cart" | "Order" | "User";

export interface AbilityRole {
  action: Actions;
  subject: Subject;
  conditions?: Record<string, unknown>;
  inverted?: boolean;
}

export type AppAbility = PureAbility<[Actions, Subject]>;
