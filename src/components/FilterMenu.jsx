import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";

function FilterMenu({ data }) {
  const { dispatch } = useContext(GlobalContext);
  return (
    <div className="flex overflow-x-auto p-2 scrollbar-thin  md:max-w-2/5 inset-shadow-sm rounded-2xl inset-shadow-violet-dark">
      <ul className="flex gap-4 md:gap-8 text-lg sm:text-2xl opacity-60 text-white">
        <li
          onClick={() => dispatch({ type: "resetSort" })}
          className="md:rounded-3xl rounded-xl bg-violet-dark px-3 py-1 md:px-6 md:py-2 cursor-pointer border-2 border-transparent hover:scale-110 transition-all hover:bg-violet-light hover:border-white active:border-white active:bg-violet-light"
        >
          All
        </li>
        {data &&
          data.length > 0 &&
          data.map((category) => (
            <li
              onClick={() =>
                dispatch({ type: "selectSort", payload: category.name })
              }
              key={category.id}
              className="md:rounded-3xl rounded-xl bg-violet-dark px-3 py-1 md:px-6 md:py-2 cursor-pointer border-2 border-transparent hover:scale-110 transition-all hover:bg-violet-light active:bg-violet-light hover:border-white active:border-white"
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FilterMenu;
