import { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import { GlobalContext } from "../features/Reducer";
import Header from "../components/Header";

function Layout() {
  const {
    state: { openModal, openAmount },
    state,
  } = useContext(GlobalContext);
  console.log(state);

  const currentProduct = useLocation();

  return (
    <div
      className={`py-3 px-4 sm:px-8 lg:px-10 bg-linear-180 from-violet-light to-violet-dark min-h-screen relative box-border overflow-x-hidden`}
    >
      <Header
        link={`${currentProduct.pathname == "/" ? "/addTransaction" : "/"}`}
        title={`${currentProduct.pathname == "/" ? "Add Transaction" : "Home"}`}
      />
      <div
        className={`${
          openModal || openAmount ? "bg-gray-700 opacity-70" : "hidden"
        } fixed inset-0 z-30`}
      ></div>
      <Outlet />
    </div>
  );
}

export default Layout;
