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
      className="bg-violet-white rounded-md cursor-pointer outline-2 outline-fuchsia-600 hover:outline-violet-500 hover:bg-violet-500 text-violet-dark py-2 px-4 text-lg hover:scale-110 font-semibold transition-all"
    >
      Save
    </button>
  );
}

export default UpdateTransaction;
