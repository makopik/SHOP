import { createContext } from "react";

import { PureAbility } from "@casl/ability";

export const AbilityContext = createContext(new PureAbility());
