import { useContext } from "react";

import AccContext from "../../contexts/AccContext";

export default function useAcc() {
  return useContext(AccContext);
}