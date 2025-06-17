import { createContext } from "react";
import type { AppAbility } from "@components/auth/abilityTypes.ts";
import { createMongoAbility } from "@casl/ability";

export const AbilityContext = createContext<AppAbility>(createMongoAbility());
