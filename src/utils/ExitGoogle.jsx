import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import { signOut } from "firebase/auth";
import { auth } from "../features/firebase";

function LoginGoogle() {
  const { dispatch } = useContext(GlobalContext);

  function handleGoogleLogOut() {
    signOut(auth)
      .then(() => {
        dispatch({ type: "setUser", payload: null });
      })
      .catch((error) => {
        console.error("Error exit:", error);
      });
  }

  return (
    <button
      onClick={handleGoogleLogOut}
      className="md:px-20 md:py-5 px-10 py-2.5 rounded-2xl transition-all shadow-2xl shadow-shadow hover:shadow-lg text-white text-2xl font-semibold bg-violet-500 hover:scale-105"
    >
      Exit
    </button>
  );
}

export default LoginGoogle;
