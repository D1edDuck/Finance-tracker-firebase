import { useContext } from "react";
import Balance from "../components/Balance";
import FilterMenu from "../components/FilterMenu";
import Transaction from "../components/Transaction";
import useFetchTransactions from "../hooks/useFetchTransaction";
import { GlobalContext } from "../features/Reducer";
import EditTransaction from "../components/EditTransaction";
import { NavLink } from "react-router";
import AddAmount from "../components/AddAmount";

function Home() {
  const { sortTransaction, userId } = useFetchTransactions();

  const {
    state: { category, openModal, openAmount },
  } = useContext(GlobalContext);
  return (
    <>
      <Balance />
      {!userId && (
        <div className="font-semibold text-xl mb-8 border-2 px-4 border-fuchsia-600 rounded-xl py-4 text-white">
          <p className=" mb-2 md:mb-4">You is not login Account</p>
          <NavLink
            to={"/profile"}
            className="border-b-2 bg-violet-white hover:outline-12 outline-violet-800 text-black rounded-xl  px-3 py-1.5 font-semibold text-lg border-transparent hover:border-b-2 hover:border-gray-500 transition-colors duration-500"
          >
            Login
          </NavLink>
        </div>
      )}
      <div className="flex justify-around mb-8 md:items-center md:flex-row gap-4 flex-col">
        <p className="md:text-2xl text-xl text-white font-semibold">
          Filter for category
        </p>
        <FilterMenu data={category} />
        <p className="md:text-2xl text-xl text-white font-semibold ">
          Filter for type
        </p>
        <FilterMenu
          data={[
            { name: "expenses", id: 100 },
            { name: "income", id: 200 },
          ]}
        />
      </div>
      <div className="grid xl:grid-cols-2 gap-8">
        {!sortTransaction.length == 0 &&
          sortTransaction.map((trans) => (
            <Transaction key={trans.id} transaction={trans} />
          ))}
      </div>
      <div className="grid xl:grid-cols-2 gap-8"></div>
      {openModal && <EditTransaction />}
      {openAmount && <AddAmount />}
    </>
  );
}

export default Home;
