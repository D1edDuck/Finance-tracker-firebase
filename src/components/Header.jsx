import { useState } from "react";
import { NavLink } from "react-router";

function Header({ title, link }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between rounded-xl md:rounded-full bg-violet-dark-opacity text-white text-2xl px-4 py-3 mb-8 relative">
      <div
        className={`flex items-center  ${menuOpen ? "mb-2" : "mb-0"} md:mb-0`}
      >
        <p className="text-lg opacity-60 mr-4">financial tracker</p>
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>
      <hr
        className={`w-3/4 h-1 bg-violet-dark text-violet-dark rounded-xl md:hidden justify-self-center mb-2 ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      />
      <nav
        className={`flex-col md:flex-row md:flex font-bold ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="flex md:justify-center justify-between space-x-15 md:space-x-15 mb-2 md:mb-0">
          <NavLink
            to={"/about"}
            className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-500 transition-colors duration-500"
          >
            About
          </NavLink>
          <NavLink
            to={"/profile"}
            className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-500 transition-colors duration-500"
          >
            Profile
          </NavLink>
          <NavLink
            to={"/filter"}
            className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-500 transition-colors duration-500"
          >
            Filter
          </NavLink>
        </div>
      </nav>
      <NavLink
        to={link}
        className={`bg-violet-white hover:outline-12 transition-all hover:inset-shadow-sm inset-shadow-shadow outline-violet-800 text-black rounded-full px-6 py-3 font-semibold text-lg ${
          menuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {title}
      </NavLink>
    </header>
  );
}

export default Header;
