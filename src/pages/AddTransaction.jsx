import Header from "../components/Header";
import FormAddTransaction from "../components/FormAddTransaction";
import SetTransaction from "../hooks/SetTransaction";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../features/Reducer";

function AddTransaction() {
  const {
    state: { name, sum, date, type, note },
    dispatch,
  } = useContext(GlobalContext);

  const [fields, setFields] = useState([]);

  useEffect(() => {
    const missingFields = [];

    if (name === "") missingFields.push("name");
    if (sum === "") missingFields.push("sum");
    if (date === "") missingFields.push("date");
    if (type === "") missingFields.push("type");
    if (note === "") missingFields.push("note");

    setFields(missingFields);
  }, [name, sum, date, type, note]);

  return (
    <>
      <h1 className="text-center font-bold text-3xl text-white mb-8">
        Add new Transaction
      </h1>
      <FormAddTransaction />
      <p className="text-center font-semibold text-white text-xl mb-8">
        {fields.length == 0
          ? "Sucsses"
          : `it is necessary to fill in the fields: ${fields.join(", ")}`}
      </p>
      <div className="flex flex-row justify-center items-center sm:gap-20 gap-10 font-semibold text-white text-xl mb-5">
        <button
          onClick={() => {
            dispatch({ type: "resetInput" });
          }}
          className="bg-fuchsia-500 sm:px-20 px-10 sm:py-5 py-2.5 rounded-2xl hover:scale-105 transition-all shadow-shadow shadow-2xl hover:shadow-lg"
        >
          Reset
        </button>
        <SetTransaction />
      </div>
    </>
  );
}

export default AddTransaction;
