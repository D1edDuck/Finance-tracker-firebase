import { useEffect, useReducer } from "react";
import { initialData, reducer } from "../features/Reducer";

function useFetchData(url) {
  const [state, dispatch] = useReducer(reducer, initialData);
  useEffect(() => {
    async function fetchData(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ERROR ${res.status}`);
        }
        const data = await res.json();

        if (data.length > 1) {
          dispatch({ type: "initTransaction", payload: data });
          dispatch({ type: "initFilter", payload: data });
        } else {
          dispatch({ type: "initData", payload: data });
        }
      } catch (err) {
        dispatch({ type: "failedFetch", payload: err.message });
      }
    }
    fetchData(url);
  }, [url]);

  return { state, dispatch };
}

export default useFetchData;
