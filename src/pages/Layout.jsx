import { Outlet } from "react-router";

function Layout() {
  return (
    <div
      className={`py-3 px-10 bg-linear-180 from-violet-light to-violet-dark min-h-screen relative`}
    >
      <Outlet />
    </div>
  );
}

export default Layout;
