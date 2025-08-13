import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ title, link }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((s) => !s);

  return (
    <header className="w-full bg-violet-dark-opacity text-white rounded-2xl md:rounded-full p-4 md:pr-6 pl-8 md:py-4 mb-4 md:mb-8">
      <div className="mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm opacity-70">financial tracker</span>
            <span className="font-semibold text-lg md:text-2xl leading-none">
              Dashboard
            </span>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="md:hidden ml-2 p-2 rounded-md relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300"
            title={menuOpen ? "Close" : "Menu"}
          >
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white transform transition duration-200 ease-in-out ${
                menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-150 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`block w-6 h-0.5 bg-white transform transition duration-200 ease-in-out ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>

        <nav className="hidden md:flex items-center justify-around gap-8 font-bold">
          <NavLink
            to="/about"
            className="text-2xl hover:text-violet-200 transition-colors"
            activeClassName="underline"
          >
            About
          </NavLink>
          <NavLink
            to="/profile"
            className="text-2xl hover:text-violet-200 transition-colors"
            activeClassName="underline"
          >
            Profile
          </NavLink>
          <NavLink
            to="/filter"
            className="text-2xl hover:text-violet-200 transition-colors"
            activeClassName="underline"
          >
            Filter
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center">
          <NavLink
            to={link}
            className="bg-violet-white text-black px-4 py-2 rounded-full font-semibold hover:brightness-95 transition"
          >
            {title}
          </NavLink>
        </div>

        <div className="md:hidden">
          <NavLink
            to={link}
            className="bg-violet-white text-black px-3 py-2 rounded-lg font-semibold text-sm"
          >
            {title}
          </NavLink>
        </div>
      </div>

      <div
        className={`md:hidden max-w-6xl mx-auto overflow-hidden transition-all duration-200 ${
          menuOpen ? "opacity-100 max-h-72 mt-4" : "opacity-0 max-h-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col bg-violet-dark-opacity/90 rounded-xl p-3 gap-1">
          <NavLink
            to="/about"
            className="block px-3 py-3 rounded-lg text-xl hover:bg-violet-dark-opacity/60 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/profile"
            className="block px-3 py-3 rounded-lg text-xl hover:bg-violet-dark-opacity/60 transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/filter"
            className="block px-3 py-3 rounded-lg text-xl hover:bg-violet-dark-opacity/60 transition"
            onClick={() => setMenuOpen(false)}
          >
            Filter
          </NavLink>

          <div className="border-t border-violet-700/40 mt-2 pt-2">
            <NavLink
              to={link}
              className="block text-center bg-violet-white text-black px-4 py-2 rounded-lg font-semibold hover:brightness-95"
              onClick={() => setMenuOpen(false)}
            >
              {title}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
