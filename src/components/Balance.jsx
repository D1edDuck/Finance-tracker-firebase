import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import useFetchWallet from "../hooks/useFetchWallet";

function Balance() {
  const {
    dispatch,
    state: { wallet },
  } = useContext(GlobalContext);
  const balance = useFetchWallet();

  return (
    <div className="flex flex-col md:px-24 md:py-12 gap-5 justify-between px-8 py-4 sm:px-24 sm:py-6 text-white font-semibold bg-linear-180 from-violet-dark to-violet-dark-opacity rounded-xl md:rounded-4xl to-65% shadow-shadow shadow-2xl mb-4 md:mb-8">
      <div className="flex flex-row justify-between">
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-0">
          <h2>{balance ? `${balance}$` : `Not data`}</h2>
          <p className="text-lg sm:text-2xl opacity-45">Balance</p>
        </div>
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-0">
          <h2>{wallet.income}$</h2>
          <p className="text-lg sm:text-2xl opacity-45">Income</p>
        </div>
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-  ">
          <h2>{wallet.expenses}$</h2>
          <p className="text-lg sm:text-2xl opacity-45">Expenses</p>
        </div>
      </div>
      {!balance && (
        <>
          <hr className="rounded-2xl text-gray-600 border-t-2" />
          <div className="flex justify-between items-center gap-2">
            <p>The initial balance is unknown, please add the amount</p>
            <button
              onClick={() => dispatch({ type: "openAmountModal" })}
              className="bg-violet-white text-violet-dark rounded-lg py-1 active:outline-2 outline-violet-light px-2 whitespace-nowrap"
            >
              Add amount
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Balance;
