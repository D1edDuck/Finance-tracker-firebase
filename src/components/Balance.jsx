import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import useFetchWallet from "../hooks/useFetchWallet";

function Balance() {
  const { dispatch } = useContext(GlobalContext);

  const wallet = useFetchWallet();

  return (
    <section
      className="mx-auto rounded-2xl mb-4 md:mb-8 bg-gradient-to-r from-violet-dark/90 to-violet-light/80 text-white p-4 sm:p-6 shadow-2xl"
      aria-labelledby="balance-title"
      role="region"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2
            id="balance-title"
            className="text-lg sm:text-xl font-semibold opacity-90"
          >
            Wallet overview
          </h2>
          <p className="text-sm text-white/75 mt-1">
            Now you can see the general information about the account.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch({ type: "openAmountModal" })}
            className="bg-white text-violet-800 rounded-lg px-3 py-2 font-semibold text-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 transition"
            aria-label="Add initial amount"
          >
            Edit amount
          </button>
        </div>
      </div>

      <div className="mt-4 bg-white/10 rounded-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-xl text-white/70">Balance</span>

          <div className="mt-2">
            {wallet?.balance != null ? (
              <span className="text-2xl sm:text-3xl font-bold">
                {wallet?.balance}$
              </span>
            ) : (
              <span className="text-2xl sm:text-3xl text-white/60">
                No data
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-center">
          <span className="text-sm text-white/70">Income</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-semibold text-green-200">
              {wallet?.income ?? 0}$
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-center">
          <span className="text-sm text-white/70">Expenses</span>
          <div className="mt-2">
            <span className="text-2xl sm:text-3xl font-semibold text-red-200">
              {wallet?.expenses ?? 0}$
            </span>
          </div>
        </div>
      </div>

      {wallet?.balance == null && (
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-3 rounded-lg">
          <p className="text-sm text-white/80">
            The initial balance is not set — add an amount to start tracking
            transactions.
          </p>
          <div>
            <button
              onClick={() => dispatch({ type: "openAmountModal" })}
              className="bg-white text-violet-800 rounded-md px-3 py-2 font-medium hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 transition"
            >
              Add initial amount
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Balance;
