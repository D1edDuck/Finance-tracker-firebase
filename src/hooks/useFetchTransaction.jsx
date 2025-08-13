import { useContext, useEffect } from "react";
import { GlobalContext } from "../features/Reducer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { sortTransactionDate } from "../utils/sortTransactionDate";

function useFetchTransaction() {
  const {
    db,
    dispatch,
    state: { user, transactions, refresh, sortName, category },
  } = useContext(GlobalContext);

  const userId = user?.uid;
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
    };

    fetchTransactions();
  }, [userId, db, dispatch, refresh]);
  return { sortTransaction, userId, category };
}

export default useFetchTransaction;
