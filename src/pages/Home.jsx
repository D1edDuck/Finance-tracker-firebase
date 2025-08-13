import { useContext } from "react";
import Balance from "../components/Balance";
import FilterMenu from "../components/FilterMenu";
import Transaction from "../components/Transaction";
import useFetchTransactions from "../hooks/useFetchTransaction";
import { GlobalContext } from "../features/Reducer";
import EditTransaction from "../components/EditTransaction";
import { NavLink } from "react-router-dom";
import AddAmount from "../components/AddAmount";

function Home() {
  const {
    state: { openModal, openAmount },
    dispatch,
  } = useContext(GlobalContext);

  const {
    sortTransaction = [],
    userId,
    category = [],
  } = useFetchTransactions();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mt-6">
        <Balance />
      </section>

      {!userId && (
        <section
          className="font-semibold text-xl mb-4 md:mb-8 border-2 px-4 border-fuchsia-600 rounded-xl py-4 text-white"
          role="status"
          aria-live="polite"
        >
          <p className="mb-2 md:mb-4">You is not login Account</p>
          <NavLink
            to={"/profile"}
            className="border-b-2 bg-violet-white hover:outline-12 outline-violet-800 text-black md:rounded-xl rounded-lg px-3 py-1.5 font-semibold text-lg border-transparent hover:border-b-2 hover:border-gray-500 transition-colors duration-500"
          >
            Login
          </NavLink>
        </section>
      )}

      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            <p className="md:text-2xl text-xl text-white font-semibold">
              Filter for category
            </p>
          </div>

          <div className="flex-1">
            <FilterMenu data={category} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <div className="flex items-center gap-3">
            <p className="md:text-2xl text-xl text-white font-semibold">
              Filter for type
            </p>
          </div>

          <div className="flex-1">
            <FilterMenu
              data={[
                { name: "expenses", id: 100 },
                { name: "income", id: 200 },
              ]}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="transactions-title" className="mb-12">
        <h2 id="transactions-title" className="sr-only">
          Transactions
        </h2>

        {!sortTransaction || sortTransaction.length === 0 ? (
          <div className="rounded-xl p-6 bg-white/5 text-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold">No transactions yet</p>
              <p className="text-sm opacity-60 mt-1">
                Add new transaction to see it here. Use the Add button or add
                amount to start.
              </p>
            </div>
            <div className="flex gap-3">
              <NavLink
                to="/filter"
                className="bg-violet-white text-violet-dark rounded-lg px-3 py-2 font-semibold text-lg hover:brightness-95 transition"
              >
                Browse categories
              </NavLink>
              <button
                onClick={() => {
                  dispatch({ type: "openAmountModal" });
                }}
                className="bg-transparent border border-white/20 text-white rounded-lg px-3 py-2 font-medium hover:bg-white/5 transition"
              >
                Add amount
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {sortTransaction.map((trans) => (
              <Transaction key={trans.id} transaction={trans} />
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
        <div className="rounded-xl p-6 bg-white/5 text-white/80">
          <p className="font-semibold text-lg">Overview</p>
          <p className="mt-2 text-sm opacity-60">Soon...</p>
        </div>

        <div className="rounded-xl p-6 bg-white/5 text-white/80">
          <p className="font-semibold text-lg">Recent activity</p>
          <p className="mt-2 text-sm opacity-60">Soon...</p>
        </div>
      </section>

      {openModal && <EditTransaction />}
      {openAmount && <AddAmount />}
    </main>
  );
}

export default Home;
