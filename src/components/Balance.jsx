import { useContext } from "react";
import useFetchData from "../hooks/useFetchData";
import { FilterContext } from "../features/FilterContext";

function Balance() {
  const {
    state: { balance, status, loading, errMessage },
  } = useFetchData("http://localhost:9000/wallet");

  const {
    state: { transaction },
  } = useContext(FilterContext);

  const type = transaction.reduce(
    (acc, item) => {
      const categorySum = item.story.reduce((sum, story) => sum + story.sum, 0);

      if (item.category === "expenses") {
        acc.expenses += categorySum;
      } else if (item.category === "income") {
        acc.income += categorySum;
      }
      acc.balance = balance.balance - (acc.expenses - acc.income);

      return acc;
    },
    { expenses: 0, income: 0, balance: 0 }
  );

  return (
    <div className="flex justify-between px-24 py-8 text-white font-semibold text-4xl bg-linear-180 from-violet-dark to-violet-dark-opacity rounded-4xl to-65% shadow-shadow shadow-2xl mb-8">
      {status == "error" ? (
        <h2>Error: {errMessage}</h2>
      ) : (
        <>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${type.balance}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Balance</p>
          </div>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${type?.income}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Income</p>
          </div>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${type.expenses}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Expenses</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Balance;
