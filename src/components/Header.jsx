import { NavLink } from "react-router";

function Header({ title, link }) {
  return (
    <header className="flex rounded-full bg-violet-dark-opacity text-white text-2xl pl-8 py-3 pr-3 items-center mb-8">
      <p className="text-lg opacity-60">financial tracker</p>
      <div className="flex justify-evenly grow font-semibold">
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
      <NavLink
        to={link}
        className="bg-violet-white hover:outline-12 transition-all hover:inset-shadow-sm inset-shadow-shadow outline-violet-800 text-black rounded-full px-6 py-3 font-semibold text-lg"
      >
        {title}
      </NavLink>
    </header>
  );
}

export default Header;
