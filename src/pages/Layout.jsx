import { Outlet, useLoaderData } from "react-router";

function Layout() {
  const loading = useLoaderData();

  return (
    <div className="py-3 px-10 bg-linear-180 from-violet-light to-violet-dark min-h-screen">
      {loading === "loading" && <p>Loading Data...</p>}
      <Outlet />
    </div>
  );
}

export default Layout;
