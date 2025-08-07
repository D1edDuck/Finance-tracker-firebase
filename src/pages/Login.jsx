import { useContext } from "react";
import Header from "../components/Header";
import { GlobalContext } from "../features/Reducer";
import LoginGoogle from "../utils/LoginGoogle";
import ExitGoogle from "../utils/ExitGoogle";

function Login() {
  const { state } = useContext(GlobalContext);

  return (
    <div>
      <Header title={"Home"} link={"/"} />
      <h2 className="text-3xl font-semibold text-white text-center pt-6 mb-15">
        Log in using Google
      </h2>
      <div className="flex justify-center gap-5">
        {!state.user && <LoginGoogle />}
        {state.user && <ExitGoogle />}
      </div>
    </div>
  );
}

export default Login;
