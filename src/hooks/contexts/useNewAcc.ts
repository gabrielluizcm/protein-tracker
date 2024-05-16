import { useContext } from "react";

import NewAccContext from "../../contexts/NewAccContext";

export default function useNewAcc() {
  return useContext(NewAccContext);
}