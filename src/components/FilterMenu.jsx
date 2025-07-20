import { useContext } from "react";
import { FilterContext } from "../features/FilterContext";

function FilterMenu({ sorter }) {
  const { data } = useContext(FilterContext);
  return (
    <div className="flex mb-8 overflow-x-auto p-2 scrollbar-thin">
      <ul className="flex gap-8 text-2xl opacity-60 text-white">
        <li
          className="rounded-3xl bg-violet-dark px-6 py-2 cursor-pointer border-2 border-transparent hover:scale-110 transition-all hover:bg-violet-light hover:border-white"
          onClick={() => {
            sorter("");
          }}
        >
          All
        </li>
        {data &&
          data.length > 0 &&
          data.map((category) => (
            <li
              onClick={() => {
                sorter(category.name);
              }}
              key={category.id}
              className="rounded-3xl bg-violet-dark px-6 py-2 cursor-pointer border-2 border-transparent hover:scale-110 transition-all hover:bg-violet-light hover:border-white"
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FilterMenu;
