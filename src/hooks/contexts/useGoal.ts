import { useContext } from "react";

import GoalContext from "../../contexts/GoalContext";

export default function useGoal() {
  return useContext(GoalContext);
}