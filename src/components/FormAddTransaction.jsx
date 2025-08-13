import { useContext } from "react";
import Input from "../UX/Input";
import { GlobalContext } from "../features/Reducer";

function FormAddTransaction() {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <div className="bg-violet-light rounded-xl mb-8 gap-y-2 inset-shadow-sm inset-shadow-violet-dark-opacity text-white font-medium text-xl grid sm:grid-cols-2 grid-cols-1 sm:grid-rows-6 items-center w-max px-10 gap-x-8 mx-auto py-10 justify-items-center">
      <div className="row-span-2 col-start-1">
        <p className=" mb-3">Amount</p>
        <Input
          placeholder={"amount"}
          type={"number"}
          dispatchType={"updateInput"}
          value={state.sum}
          name={"sum"}
        />
      </div>

      <div className="col-start-1 row-span-2">
        <p className="mb-3">Date</p>
        <Input
          placeholder={"date"}
          type={"date"}
          dispatchType={"updateInput"}
          value={state.date}
          name={"date"}
        />
      </div>

      <div className="col-start-1 row-span-2">
        <p className=" mb-3">Note</p>
        <Input
          placeholder={"note"}
          type={"text"}
          dispatchType={"updateInput"}
          value={state.note}
          name={"note"}
        />
      </div>

      <div className="sm:col-start-2 row-start-1 sm:row-end-4">
        <label className="mb-3 flex flex-col">
          <span className="mb-1 font-semibold">Category</span>
          <Input
            placeholder={"name"}
            type={"text"}
            dispatchType={"updateInput"}
            value={state.name}
            name={"name"}
          />
        </label>
      </div>

      <div className="sm:col-start-2 row-start-4 row-end-6 items-start">
        <p className="mb-3">Type</p>
        <select
          onChange={(e) => {
            dispatch({
              type: "updateInput",
              payload: { input: e.target.value, name: "type" },
            });
          }}
          value={state.type}
          required
          className={`bg-white rounded-2xl w-60
           text-black px-3 py-1 focus:outline-0`}
        >
          <option value="" disabled>
            Select type
          </option>
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
    </div>
  );
}

export default FormAddTransaction;
