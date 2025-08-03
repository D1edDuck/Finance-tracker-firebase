import { useContext } from "react";
import Header from "../components/Header";
import { FilterContext } from "../features/FilterContext";
import FormAddTransaction from "../components/FormAddTransaction";
import { useNavigate } from "react-router";

function AddTransaction() {
  const { state, dispatch } = useContext(FilterContext);
  const inputValue = state.inputValue;
  const navigate = useNavigate();

  if (state.status === "loading") {
    return <h1>Loading</h1>;
  }
  console.log(inputValue);
  return (
    <>
      <Header title={"Home"} link={"/"} />
      <h1 className="text-center font-bold text-3xl text-white mb-8">
        Add new Transaction
      </h1>
      <FormAddTransaction />
      <div className="flex justify-center gap-20 font-semibold text-white text-xl">
        <button
          onClick={() => {
            dispatch({ type: "reset" });
          }}
          className="bg-fuchsia-500 px-20 py-5 rounded-2xl hover:scale-105 transition-all shadow-shadow shadow-2xl hover:shadow-lg"
        >
          Reset
        </button>
        <button
          onClick={() => {
            navigate("/");
            dispatch({ type: "newTransaction", payload: state.inputValue });
            dispatch({ type: "resetSort" });
          }}
          disabled={Object.values(inputValue).some(
            (value) => value.trim() === ""
          )}
          className={`px-20 py-5 rounded-2xl transition-all shadow-2xl shadow-shadow hover:shadow-lg ${
            Object.values(inputValue).some((value) => value.trim() === "")
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-violet-500"
          }`}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTransaction;
