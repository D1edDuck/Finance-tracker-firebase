import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";

function Transaction({ transaction }) {
  const { dispatch } = useContext(GlobalContext);

  return (
    <div className="flex justify-between rounded-3xl bg-linear-90 from-violet-light to-violet-light-opacity px-4 py-2.5 sm:px-8 sm:py-5 group hover:border-l-fuchsia-600 border-l-8 hover:border-l-12 hover:shadow-xl shadow-lg shadow-shadow border-white items-center text-white text-2xl  hover:translate-x-2 transition-all ">
      <div className="flex items-center gap-8">
        <div className="p-4 bg-violet-white rounded-2xl">
          <svg className="sm:w-8 sm:h-8 w-5 h-5 fill-violet-dark transition-all">
            <use xlinkHref={`/symbol-defs.svg#icon-${transaction.img}`}></use>
          </svg>
        </div>
        <div>
          <h3 className="font-semibold">{transaction.name}</h3>
          <p className="opacity-50 text-xs sm:text-lg">{transaction.date}</p>
        </div>
      </div>
      <div className=" flex gap-8 ">
        <p
          className={` font-semibold ${
            transaction.type === "income" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {transaction.sum}$
        </p>
        <button
          onClick={() =>
            dispatch({ type: "openEditModal", payload: transaction })
          }
          className="bg-violet-white rounded-xl outline-2 outline-violet-dark-opacity sm:rounded-md cursor-pointer group-hover:bg-fuchsia-600 text-violet-dark p-2 text-sm hover:scale-110 font-semibold transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Transaction;
