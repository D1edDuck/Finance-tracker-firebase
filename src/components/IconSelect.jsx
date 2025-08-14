import { useState, useRef, useEffect } from "react";

function Icon({ name, className = "w-6 h-6 fill-violet-dark" }) {
  if (!name) return null;
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use xlinkHref={`/symbol-defs.svg#icon-${name}`} />
    </svg>
  );
}

export default function IconSelect({
  icons = [],
  value,
  onChange,
  placeholder = "Select icon",
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open) setHighlight(-1);
  }, [open]);

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      e.preventDefault();
      return;
    }
    if (open) {
      if (e.key === "ArrowDown") {
        setHighlight((h) => Math.min(h + 1, icons.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlight((h) => Math.max(h - 1, 0));
        e.preventDefault();
      } else if (e.key === "Enter") {
        if (highlight >= 0) {
          onChange(icons[highlight]);
          setOpen(false);
        }
        e.preventDefault();
      } else if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (open && highlight >= 0 && listRef.current) {
      const el = listRef.current.querySelectorAll("li")[highlight];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlight, open]);

  return (
    <div className="relative w-60" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between bg-white text-black rounded-2xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-300 shadow-sm"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-violet-50">
            {value ? (
              <Icon name={value} className="w-5 h-5 fill-violet-dark" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xl truncate">
              {value ? (
                value
              ) : (
                <span className="text-gray-400">{placeholder}</span>
              )}
            </div>
          </div>
        </div>

        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 011.04 1.08l-4.23 3.97a.75.75 0 01-1.04 0L5.25 8.27a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Icons"
          tabIndex={-1}
          className="absolute z-50 mt-2 max-h-52 overflow-auto w-full bg-white rounded-2xl shadow-lg py-1 ring-1 ring-black ring-opacity-5"
          onKeyDown={onKeyDown}
        >
          {icons.map((icon, idx) => {
            const selected = icon === value;
            const highlighted = idx === highlight;
            return (
              <li
                key={icon}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlight(idx)}
                onMouseLeave={() => setHighlight(-1)}
                onClick={() => {
                  onChange(icon);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer select-none ${
                  selected ? "bg-violet-100" : highlighted ? "bg-violet-50" : ""
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-md bg-violet-25">
                  <Icon name={icon} className="w-5 h-5 fill-violet-dark" />
                </div>
                <span className="text-lg truncate text-black">{icon}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
