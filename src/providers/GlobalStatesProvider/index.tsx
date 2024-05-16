import { useState } from "react";

import AccContext from "../../contexts/AccContext";
import NewAccContext from "../../contexts/NewAccContext";
import GoalContext from "../../contexts/GoalContext";

export type GlobalStatesContextType<T> = {
  state: T,
  setState: (value: T) => void
}

type GlobalStatesProviderProps = {
  children: React.ReactNode
}

export default function GlobalStatesProvider({ children }: GlobalStatesProviderProps) {
  const [acc, setAcc] = useState(0);
  const [newAcc, setNewAcc] = useState(0);
  const [goal, setGoal] = useState(100);

  return (
    <AccContext.Provider value={{ state: acc, setState: value => setAcc(value) }}>
      <NewAccContext.Provider value={{ state: newAcc, setState: value => setNewAcc(value) }}>
        <GoalContext.Provider value={{ state: goal, setState: value => setGoal(value) }}>
          {children}
        </GoalContext.Provider>
      </NewAccContext.Provider>
    </AccContext.Provider>
  )
}