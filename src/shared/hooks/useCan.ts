import { useAbility } from "@/hooks/useAbility.ts";

export function useCan() {
  const ability = useAbility();

  return {
    Can: ability.can.bind(ability),
    Cannot: ability.cannot.bind(ability),
    ability,
  };
}
