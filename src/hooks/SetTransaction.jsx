import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SetTransaction() {
  const {
    state: { user, name, sum, date, type, note },
    db,
    dispatch,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.uid;
    if (!userId) {
      alert("You are not logged in");
      return;
    }

    const parsedSum = parseFloat(sum);
    if (Number.isNaN(parsedSum)) {
      alert("Некорректная сумма");
      return;
    }

    try {
      const transactionsColRef = collection(db, "transactions");
      const walletDocRef = doc(db, "wallet", userId);

      await runTransaction(db, async (tx) => {
        const walletSnap = await tx.get(walletDocRef);

        let newIncome = 0;
        let newExpense = 0;
        let newBalance = 0;

        if (walletSnap.exists()) {
          const data = walletSnap.data();
          newIncome = Number(data.income ?? 0);
          newExpense = Number(data.expenses ?? 0);
          newBalance = Number(data.balance ?? 0);
        } else {
          newIncome = 0;
          newExpense = 0;
          newBalance = 0;
        }

        if (type === "income") {
          newIncome += parsedSum;
          newBalance += parsedSum;
        } else if (type === "expenses") {
          newExpense += parsedSum;
          newBalance -= parsedSum;
        } else {
          throw new Error("Unknown transaction type: " + type);
        }

        const newTransactionRef = doc(transactionsColRef);
        tx.set(newTransactionRef, {
          userId,
          name,
          sum: parsedSum,
          date,
          note,
          type,
          img: name,
          createdAt: serverTimestamp(),
        });

        const walletPayload = {
          userId,
          income: newIncome,
          expenses: newExpense,
          balance: newBalance,
          updatedAt: serverTimestamp(),
        };

        if (walletSnap.exists()) {
          tx.update(walletDocRef, walletPayload);
        } else {
          tx.set(walletDocRef, {
            ...walletPayload,
            createdAt: serverTimestamp(),
          });
        }
      });

      navigate("/");
    } catch (error) {
      console.error(
        "Ошибка при добавлении транзакции и обновлении кошелька:",
        error
      );
      alert("Ошибка при сохранении. Попробуйте ещё раз.");
    } finally {
      dispatch({ type: "resetInput" });
    }
  };

  function checkInput() {
    return (
      note !== "" && name !== "" && sum !== "" && date !== "" && type !== ""
    );
  }

  return (
    <button
      disabled={!checkInput()}
      onClick={handleSubmit}
      className={`sm:px-20 px-10 sm:py-5 py-2.5 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-shadow hover:shadow-lg ${
        !checkInput() ? "bg-gray-400 cursor-not-allowed" : "bg-violet-500"
      }`}
    >
      Save
    </button>
  );
}

export default SetTransaction;
