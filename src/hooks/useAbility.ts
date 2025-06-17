import { useAppSelector } from "@hooks/redux";
import { defineAbilityFor } from "@components/auth/abilityTypes";
import React from "react";

export function useAbility() {
  const role = useAppSelector((state) => state.auth.role ?? "user");
  return React.useMemo(() => defineAbilityFor(role), [role]);
}
