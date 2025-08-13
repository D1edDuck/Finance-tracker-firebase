import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";

function UpdateTransaction() {
  const {
    state: { editTransaction, sum, note, date },
    db,
    dispatch,
  } = useContext(GlobalContext);

  const updateTransaction = async (id, updatedData) => {
    const transactionRef = doc(db, "transactions", id);
    try {
      await updateDoc(transactionRef, updatedData);
    } catch (error) {
      console.error("Error update data: ", error);
    }
  };

  return (
    <button
      onClick={() => {
        const updateData = {
          sum: sum || editTransaction.sum,
          date: date || editTransaction.date,
          note: note || editTransaction.note,
        };
        updateTransaction(editTransaction.id, updateData);
        dispatch({ type: "resetInput" });
        dispatch({ type: "updateData" });
        dispatch({ type: "openEditModal" });
      }}
      className="flex items-center justify-center px-4 py-2 rounded-lg border border-fuchsia-500 text-fuchsia-700 bg-transparent hover:bg-fuchsia-50 transition"
    >
      Save
    </button>
  );
}

export default UpdateTransaction;
