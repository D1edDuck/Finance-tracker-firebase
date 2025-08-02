import { useContext } from "react";
import { Outlet, useLoaderData } from "react-router";
import { FilterContext } from "../features/FilterContext";

function Layout() {
  const loading = useLoaderData();

  const {
    state: { open },
  } = useContext(FilterContext);

  return (
    <div
      className={`py-3 px-10 bg-linear-180 from-violet-light to-violet-dark min-h-screen relative`}
    >
      <div
        className={`${
          open ? "bg-gray-700 opacity-70" : "hidden"
        } fixed inset-0 z-30`}
      ></div>
      {loading === "loading" && <p className="font-bold">Loading Data...</p>}
      <Outlet />
    </div>
  );
}

export default Layout;
