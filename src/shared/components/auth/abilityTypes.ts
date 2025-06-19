import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from "@casl/ability";

export type Actions = "manage" | "read" | "create" | "update" | "delete";

export type Subjects = "Product" | "Order" | "User" | "all";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilityFor(role: "admin" | "user"): AppAbility {
  const { can, cannot, rules } = new AbilityBuilder<AppAbility>(
    createMongoAbility,
  );

  if (role === "admin") {
    can("manage", "all");
  } else if (role === "user") {
    can("read", "Product");
    cannot("delete", "Product");
    can("read", "Order");
    can("update", "User");
  } else {
    can("read", "Product");
    cannot("delete", "Product");
  }
  return createMongoAbility(rules) as AppAbility;
}
