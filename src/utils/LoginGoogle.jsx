import { useContext } from "react";
import { signInWithGoogle } from "../features/firebase";
import { GlobalContext } from "../features/Reducer";

function LoginGoogle() {
  const { dispatch } = useContext(GlobalContext);

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((user) => {
        dispatch({ type: "setUser", payload: user });
      })
      .catch((error) => {
        alert("Error log in: " + error.message);
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-20 py-5 rounded-2xl transition-all shadow-2xl shadow-shadow hover:shadow-lg text-white text-2xl font-semibold bg-violet-500 hover:scale-105"
    >
      Log in
    </button>
  );
}

export default LoginGoogle;
