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

  console.log(fields);

  return (
    <>
      <Header title={"Home"} link={"/"} />
      <h1 className="text-center font-bold text-3xl text-white mb-8">
        Add new Transaction
      </h1>
      <FormAddTransaction />
      <div className="flex justify-center gap-20 font-semibold text-white text-xl mb-5">
        <button
          onClick={() => {
            dispatch({ type: "resetInput" });
          }}
          className="bg-fuchsia-500 px-20 py-5 rounded-2xl hover:scale-105 transition-all shadow-shadow shadow-2xl hover:shadow-lg"
        >
          Reset
        </button>
        <SetTransaction />
      </div>
      <p className="text-center font-semibold text-white text-xl">
        {fields.length == 0
          ? "Sucsses"
          : `it is necessary to fill in the fields: ${fields.join(", ")}`}
      </p>
    </>
  );
}

export default AddTransaction;
