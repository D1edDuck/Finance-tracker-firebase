import { createContext, useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";

export const FilterContext = createContext();

export function Filter({ children }) {
  const {
    state: { data },
  } = useFetchData("http://localhost:9000/expenses");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data) setCategory(data);
  }, [data]);

  function sorter(sort) {
    if (!sort) setCategory(data);
    else setCategory(data.filter((category) => category.name == sort));
  }

  return (
    <FilterContext.Provider value={{ sorter, category, data }}>
      {children}
    </FilterContext.Provider>
  );
}
