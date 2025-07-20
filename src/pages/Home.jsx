import { useContext } from "react";
import Balance from "../components/Balance";
import FilterMenu from "../components/FilterMenu";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import useFetchData from "../hooks/useFetchData";
import { FilterContext } from "../features/FilterContext";

function Home() {
  const {
    state: { status, errMessage },
  } = useFetchData("http://localhost:9000/expenses");

  const { sorter, category } = useContext(FilterContext);

  if (status === "loading") {
    return <h2>Loading, please wait..</h2>;
  }
  return (
    <>
      <Header />
      <Balance />
      <FilterMenu sorter={sorter} />
      {status === "error" && <h2>Error: {errMessage}</h2>}
      <div className="grid xl:grid-cols-2 gap-8">
        {category.length > 0 &&
          category.map((category) =>
            category.story.map((transaction) => (
              <Transaction
                key={transaction.id}
                category={category}
                transaction={transaction}
              />
            ))
          )}
      </div>
    </>
  );
}

export default Home;
