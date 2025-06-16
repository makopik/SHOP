import { useContext } from "react";
import { AbilityContext } from "@components/auth/AbilityContext.tsx";

export const useAbility = () => {
  return useContext(AbilityContext);
};
