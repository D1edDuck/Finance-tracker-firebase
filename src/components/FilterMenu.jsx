import React, { useContext, useCallback, memo } from "react";
import { GlobalContext } from "../features/Reducer";

function FilterMenu({ data = [], label = "" }) {
  const { state, dispatch } = useContext(GlobalContext);
  const selected = state.sortName ?? null;

  const select = useCallback(
    (name) => {
      if (!name) dispatch({ type: "resetSort" });
      else dispatch({ type: "selectSort", payload: name });
    },
    [dispatch]
  );

  const handleKey = useCallback(
    (e, name) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(name);
      }
    },
    [select]
  );

  return (
    <div className="w-full min-w-0">
      {label && (
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold uppercase text-violet-200">
            {label}
          </span>
        </div>
      )}

      <div
        className="overflow-x-auto scrollbar-thin p-1 rounded-2xl inset-shadow-violet-dark"
        style={{ WebkitOverflowScrolling: "touch", boxSizing: "border-box" }}
      >
        <ul
          className="flex gap-4 sm:gap-5 items-center flex-nowrap pr-4 min-w-0"
          role="list"
          aria-label={label || "Filter menu"}
        >
          <li className="flex-shrink-0">
            <button
              type="button"
              onClick={() => select(null)}
              onKeyDown={(e) => handleKey(e, null)}
              aria-pressed={selected === null}
              className={`inline-flex font-semibold items-center justify-center rounded-full px-4 py-1 md:px-6 md:py-2 text-sm sm:text-lg cursor-pointer border-2 transition-colors focus:outline-none
                ${
                  selected === ""
                    ? "bg-[#E9E5F8] text-[#1F2130] border-white shadow-sm transform scale-100"
                    : "bg-[#2B2F3A] text-[#D6D8E3] border-transparent hover:bg-[#3A3F50] hover:text-white"
                }
                }`}
              style={{ whiteSpace: "nowrap" }}
            >
              All
            </button>
          </li>

          {Array.isArray(data) &&
            data.map((category) => {
              const name = category?.name ?? String(category?.id);
              const isActive = selected === name;
              return (
                <li key={category?.id ?? name} className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => select(name)}
                    onKeyDown={(e) => handleKey(e, name)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center font-semibold justify-center rounded-2xl md:rounded-full px-4 py-1 md:px-6 md:py-2 text-lg sm:text-xl cursor-pointer border-2 transition-colors ease-out duration-150 focus:outline-none 
                      ${
                        isActive
                          ? "bg-[#E9E5F8] text-[#1F2130] border-white shadow-sm transform scale-100"
                          : "bg-[#2B2F3A] text-[#D6D8E3] border-transparent hover:bg-[#3A3F50] hover:text-white"
                      }
                      }`}
                    style={{
                      maxWidth: 220,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default memo(FilterMenu);
