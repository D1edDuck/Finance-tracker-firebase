import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";

function UpdateTransaction() {
  const {
    state: { editTransaction, sum, note, date },
    db,
    dispatch,
  } = useContext(GlobalContext);

  if (!editTransaction) return null;

  const handleSave = async () => {
    const oldSumRaw = editTransaction.sum;
    const oldSum = Number(oldSumRaw) || 0;
    const oldType = editTransaction.type;
    const userId = editTransaction.userId;
    if (!userId) {
      alert("Ошибка: у транзакции отсутствует userId.");
      return;
    }

    const newSumParsed = sum !== "" && sum != null ? parseFloat(sum) : oldSum;
    if (Number.isNaN(newSumParsed)) {
      alert("Некорректная сумма");
      return;
    }
    const newDate = date && date !== "" ? date : editTransaction.date;
    const newNote =
      note !== undefined && note !== "" ? note : editTransaction.note;

    const txRef = doc(db, "transactions", editTransaction.id);
    const walletRef = doc(db, "wallet", userId);

    try {
      await runTransaction(db, async (tx) => {
        const txSnap = await tx.get(txRef);
        if (!txSnap.exists()) {
          throw new Error("Транзакция не найдена");
        }
        const txData = txSnap.data();

        const storedOldSum = Number(txData.sum) || 0;
        const storedOldType = txData.type || oldType;

        const walletSnap = await tx.get(walletRef);
        let curIncome = 0;
        let curExpenses = 0;
        let curBalance = 0;

        if (walletSnap.exists()) {
          const w = walletSnap.data();
          curIncome = Number(w.income ?? 0);
          curExpenses = Number(w.expenses ?? 0);
          curBalance = Number(w.balance ?? 0);
        }

        if (storedOldType === "income") {
          curIncome -= storedOldSum;
          curBalance -= storedOldSum;
        } else if (storedOldType === "expenses") {
          curExpenses -= storedOldSum;
          curBalance += storedOldSum;
        }

        const newType = storedOldType;
        if (newType === "income") {
          curIncome += newSumParsed;
          curBalance += newSumParsed;
        } else if (newType === "expenses") {
          curExpenses += newSumParsed;
          curBalance -= newSumParsed;
        } else {
          throw new Error("Неизвестный тип транзакции: " + newType);
        }

        const updatedTxPayload = {
          sum: newSumParsed,
          date: newDate,
          note: newNote,
          updatedAt: serverTimestamp(),
        };
        tx.update(txRef, updatedTxPayload);

        const walletPayload = {
          userId,
          income: curIncome,
          expenses: curExpenses,
          balance: curBalance,
          updatedAt: serverTimestamp(),
        };

        if (walletSnap.exists()) {
          tx.update(walletRef, walletPayload);
        } else {
          tx.set(walletRef, {
            ...walletPayload,
            createdAt: serverTimestamp(),
          });
        }
      });

      dispatch({ type: "resetInput" });
      dispatch({ type: "updateData" });
      dispatch({ type: "openEditModal" });
    } catch (err) {
      console.error("Ошибка при обновлении транзакции/кошелька:", err);
      alert("Ошибка при сохранении изменений. Проверьте консоль.");
    }
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center justify-center px-4 py-2 rounded-lg border border-fuchsia-500 text-fuchsia-700 bg-transparent hover:bg-fuchsia-50 transition"
    >
      Save
    </button>
  );
}

export default UpdateTransaction;
