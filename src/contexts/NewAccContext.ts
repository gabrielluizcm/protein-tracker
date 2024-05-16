import { createContext } from "react";

import type { GlobalStatesContextType } from "../providers/GlobalStatesProvider";

const NewAccContext = createContext<GlobalStatesContextType<number>>({ state: 0, setState: value => { value } });

export default NewAccContext;