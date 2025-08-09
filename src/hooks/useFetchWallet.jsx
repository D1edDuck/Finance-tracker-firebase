import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../features/Reducer";
import { collection, query, where, getDocs } from "firebase/firestore";

function useFetchWallet() {
  const {
    db,
    state: { user, refresh },
  } = useContext(GlobalContext);

  const [balance, setBalance] = useState(null);
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;

    const fetchBalance = async () => {
      try {
        const walletRef = collection(db, "wallet");
        const q = query(walletRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        console.log(q);
        if (!querySnapshot.empty) {
          const walletDoc = querySnapshot.docs[0];
          const data = walletDoc.data();
          setBalance(data.balance);
        } else {
          setBalance(0);
        }
      } catch (error) {
        console.error("Ошибка при получении баланса", error);
        setBalance(null);
      }
    };

    fetchBalance();
  }, [userId, db, refresh]);

  return balance;
}

export default useFetchWallet;
