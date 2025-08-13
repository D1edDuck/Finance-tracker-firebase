import { useContext, useRef, useEffect, useState } from "react";
import { GlobalContext } from "../features/Reducer";

function FilterMenu({ data }) {
  const { dispatch } = useContext(GlobalContext);
  const [selected, setSelected] = useState("All");
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const active = container.querySelector('[data-active="true"]');
    if (active) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const offset =
        active.offsetLeft -
        container.scrollLeft -
        (containerRect.width / 2 - activeRect.width / 2);
      container.scrollTo({
        left: offset + container.scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selected, data]);

  const handleSelect = (name) => {
    setSelected(name);
    if (name === "All") {
      dispatch({ type: "resetSort" });
    } else {
      dispatch({ type: "selectSort", payload: name });
    }
  };

  const onKey = (e, name) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(name);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto p-2 scrollbar-thin  inset-shadow-sm rounded-xl md:rounded-2xl inset-shadow-violet-dark"
      role="toolbar"
      aria-label="Filter categories"
    >
      <ul className="flex gap-4 md:gap-8 text-lg sm:text-2xl opacity-60 text-white">
        <li
          role="button"
          tabIndex={0}
          data-active={selected === "All"}
          onClick={() => handleSelect("All")}
          onKeyDown={(e) => onKey(e, "All")}
          className={`md:rounded-3xl rounded-lg bg-violet-dark px-3 py-1 md:px-6 md:py-2 cursor-pointer border-2 border-transparent hover:scale-110 transition-all hover:bg-violet-light hover:border-white active:border-white active:bg-violet-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
          aria-pressed={selected === "All"}
          aria-label="Show all categories"
        >
          All
        </li>

        {data &&
          data.length > 0 &&
          data.map((category) => {
            const isActive = selected === category.name;
            return (
              <li
                key={category.id}
                role="button"
                tabIndex={0}
                data-active={isActive}
                onClick={() => handleSelect(category.name)}
                onKeyDown={(e) => onKey(e, category.name)}
                className={`md:rounded-3xl rounded-lg bg-violet-dark px-3 py-1 md:px-6 md:py-2 cursor-pointer border-2 transition-all hover:scale-110 hover:bg-violet-light hover:border-white active:bg-violet-light active:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? "scale-110 border-white bg-violet-light"
                    : "border-transparent"
                }`}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.name}`}
              >
                {category.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default FilterMenu;
