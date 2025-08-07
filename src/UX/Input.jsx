import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";

function Input({ placeholder, type, dispatchType, value, name }) {
  const { dispatch } = useContext(GlobalContext);
  return (
    <input
      className="bg-white rounded-2xl px-3 w-60 text-black focus:outline-0 py-1 mb-5"
      placeholder={placeholder}
      type={type}
      onChange={(e) =>
        dispatch({
          type: dispatchType,
          payload: { input: e.target.value, name: name },
        })
      }
      value={value}
    />
  );
}

export default Input;
