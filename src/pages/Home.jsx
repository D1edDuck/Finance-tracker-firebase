import { useContext } from "react";
import Balance from "../components/Balance";
import FilterMenu from "../components/FilterMenu";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import useFetchData from "../hooks/useFetchData";
import { FilterContext } from "../features/FilterContext";
import EditTransaction from "../components/EditTransaction";

function Home() {
  const {
    state: { status, errMessage },
  } = useFetchData("http://localhost:9000/transaction");

  const {
    state: { filterTransaction, transaction, open },
    dispatch,
  } = useContext(FilterContext);

  if (status === "loading") {
    return <h2>Loading, please wait..</h2>;
  }

  return (
    <>
      <Header link={"/addTransaction"} title={"add transaction"} />
      <Balance />
      <div className="flex justify-around  gap-40">
        <FilterMenu data={transaction} dispatch={dispatch} sort={"Name"} />
        <FilterMenu
          data={[
            { name: "expenses", id: 100 },
            { name: "income", id: 200 },
          ]}
          dispatch={dispatch}
          sort={"Category"}
        />
      </div>
      {status === "error" && <h2>Error: {errMessage}</h2>}
      <div className="grid xl:grid-cols-2 gap-8">
        {filterTransaction.length > 0 &&
          filterTransaction.map((category) =>
            category.story.map((transaction, index) => (
              <Transaction
                key={transaction.id || index}
                category={category}
                transaction={transaction}
              />
            ))
          )}
      </div>
      {open && <EditTransaction />}
    </>
  );
}

export default Home;
