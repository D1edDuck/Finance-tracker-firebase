import { createContext } from "react";
import useFetchData from "../hooks/useFetchData";

export const FilterContext = createContext();

export function FilterState({ children }) {
  const { state, dispatch } = useFetchData("http://localhost:9000/transaction");

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}
