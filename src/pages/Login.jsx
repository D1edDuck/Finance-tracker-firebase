import { useContext } from "react";
import Header from "../components/Header";
import { GlobalContext } from "../features/Reducer";
import LoginGoogle from "../utils/LoginGoogle";
import ExitGoogle from "../utils/ExitGoogle";
import { NavLink } from "react-router";

function Login() {
  const { state } = useContext(GlobalContext);

  function checkUser() {
    if (state.user?.uid == undefined) {
      return false;
    } else return true;
  }

  return (
    <div>
      <Header title={"Home"} link={"/"} />
      <h2 className="text-3xl font-semibold text-white text-center pt-6 mb-15">
        Log in using Google
      </h2>
      <div className="flex justify-center gap-5">
        {!state.user ? <LoginGoogle /> : <ExitGoogle />}
        {checkUser() ? (
          <NavLink
            to={"/"}
            className="md:px-20 md:py-5 px-10 py-2.5 rounded-2xl transition-all shadow-2xl shadow-shadow hover:shadow-lg text-white text-2xl font-semibold bg-violet-500 hover:scale-105"
          >
            Back Home
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;
