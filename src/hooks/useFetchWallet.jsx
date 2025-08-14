import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../features/Reducer";
import { doc, getDoc, setDoc } from "firebase/firestore";

function useFetchWallet() {
  const {
    db,
    state: { user, refresh },
  } = useContext(GlobalContext);

  const [wallet, setWallet] = useState(null);
  const userId = user?.uid;

  useEffect(() => {
    if (!userId || !db) {
      setWallet(null);
      return;
    }

    const fetchOrInitWallet = async () => {
      try {
        const walletDocRef = doc(db, "wallet", userId);
        const snap = await getDoc(walletDocRef);

        if (snap.exists()) {
          const data = snap.data();
          setWallet({
            id: snap.id,
            income: data.income ?? 0,
            expenses: data.expense ?? 0,
            balance: data.balance ?? 0,
            ...data,
          });
        } else {
          const initial = {
            userId,
            income: 0,
            expenses: 0,
            balance: 0,
            createdAt: new Date().toISOString(),
          };
          await setDoc(walletDocRef, initial);
          setWallet({ id: walletDocRef.id, ...initial });
        }
      } catch (error) {
        console.error("Ошибка при получении/инициализации кошелька", error);
        setWallet(null);
      }
    };

    fetchOrInitWallet();
  }, [userId, db, refresh]);

  return wallet;
}

export default useFetchWallet;
