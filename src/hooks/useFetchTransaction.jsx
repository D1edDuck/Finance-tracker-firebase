import { useContext, useEffect } from "react";
import { GlobalContext } from "../features/Reducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { sortTransactionDate } from "../utils/sortTransactionDate";

function useFetchTransaction() {
  const {
    state,
    db,
    dispatch,
    state: { transactions, refresh, sortName },
  } = useContext(GlobalContext);
  const userId = state.user?.uid;
  const sortTransaction = sortTransactionDate(transactions, sortName);

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      const transactionsRef = collection(db, "transactions");
      const q = query(transactionsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedTransactions = [];
      querySnapshot.forEach((doc) => {
        fetchedTransactions.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "getTransactions", payload: fetchedTransactions });
      dispatch({ type: "getCategory" });
    };

    fetchTransactions();
  }, [userId, db, dispatch, refresh]);
  return { sortTransaction };
}

export default useFetchTransaction;
