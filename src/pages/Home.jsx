import { useContext } from "react";
import Balance from "../components/Balance";
import FilterMenu from "../components/FilterMenu";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import useFetchTransactions from "../hooks/useFetchTransaction";
import { GlobalContext } from "../features/Reducer";

function Home() {
  const { transactions } = useFetchTransactions();
  const {
    state: { category },
  } = useContext(GlobalContext);

  return (
    <>
      <Header link={"/addTransaction"} title={"add transaction"} />
      <Balance />
      <div className="flex justify-around  gap-40">
        <FilterMenu data={category} />
        <FilterMenu
          data={[
            { name: "expenses", id: 100 },
            { name: "income", id: 200 },
          ]}
        />
      </div>
      <div className="grid xl:grid-cols-2 gap-8">
        {!transactions.length == 0 &&
          transactions.map((trans) => (
            <Transaction key={trans.id} transaction={trans} />
          ))}
      </div>
      <div className="grid xl:grid-cols-2 gap-8"></div>
    </>
  );
}

export default Home;
