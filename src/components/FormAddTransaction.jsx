import { useContext } from "react";
import { FilterContext } from "../features/FilterContext";

function FormAddTransaction() {
  const { state, dispatch } = useContext(FilterContext);

  const categoriesList = state.transaction.map((item) => item.name);

  return (
    <div className="bg-violet-light rounded-xl mb-8 gap-y-2 inset-shadow-sm inset-shadow-violet-dark-opacity text-white font-medium text-xl grid grid-cols-2 grid-rows-6 items-center w-max px-10 gap-x-8 mx-auto py-10 justify-items-center">
      <div className="row-span-2 col-start-1">
        <p className="pl-5 mb-3">Amount</p>
        <input
          value={state.inputValue.amount}
          onChange={(e) =>
            dispatch({ type: "updateAmount", payload: e.target.value })
          }
          type="number"
          placeholder="0"
          required
          className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
        />
      </div>

      <div className="col-start-1 row-span-2">
        <p className="pl-5 mb-3">Date</p>
        <input
          value={state.inputValue.date}
          onChange={(e) =>
            dispatch({ type: "updateDate", payload: e.target.value })
          }
          type="date"
          required
          className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
        />
      </div>

      <div className="col-start-1 row-span-2">
        <p className="pl-5 mb-3">Note</p>
        <input
          value={state.inputValue.note}
          onChange={(e) =>
            dispatch({ type: "updateNote", payload: e.target.value })
          }
          type="text"
          placeholder="text..."
          required
          className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
        />
      </div>

      <div className="col-start-2 row-start-1 row-end-4">
        <label className="mb-3 flex flex-col">
          <span className="mb-1 font-semibold">Category</span>
          <input
            value={state.inputValue.name}
            list="categories"
            name="name"
            onChange={(e) =>
              dispatch({ type: "updateName", payload: e.target.value })
            }
            required
            className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
          />
          <datalist id="categories">
            {categoriesList.map((category, index) => (
              <option key={index} value={category} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="col-start-2 row-start-4 row-end-6 items-start">
        <p className="mb-3">Type</p>
        <select
          value={state.inputValue.category}
          onChange={(e) =>
            dispatch({ type: "updateCategory", payload: e.target.value })
          }
          required
          className="bg-white rounded-xl text-black px-3 focus:outline-0"
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
