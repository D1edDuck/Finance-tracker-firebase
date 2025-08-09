import { useContext } from "react";
import Input from "../UX/Input";
import { GlobalContext } from "../features/Reducer";
import { doc, getDoc, setDoc } from "firebase/firestore";

function AddAmount() {
  const {
    state: { balance, user },
    dispatch,
    db,
  } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.uid;

    if (!userId) {
      alert("You are not logged in");
      return;
    }

    try {
      const userDocRef = doc(db, "wallet", userId);

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await setDoc(
          userDocRef,
          { balance: Number(balance), userId },
          { merge: true }
        );
      } else {
        await setDoc(userDocRef, { balance: Number(balance), userId });
      }
    } catch (error) {
      console.error("Ошибка при сохранении баланса", error);
    }

    dispatch({ type: "resetInput" });
    dispatch({ type: "openAmountModal" });
    dispatch({ type: "updateData" });
  };

  return (
    <div className="bg-violet-white p-5 fixed top-1/2 z-50 left-1/2 flex flex-col gap-5  -translate-x-1/2 -translate-y-1/2 rounded-md shadow-shadow shadow-md">
      <h2 className="text-xl">Enter your current balance</h2>
      <Input
        placeholder={"balance"}
        type={"number"}
        value={balance}
        name={"balance"}
        width={"full"}
        dispatchType={"updateInput"}
      />
      <button
        disabled={!balance}
        onClick={handleSubmit}
        className={`${
          balance ? "bg-fuchsia-500" : "bg-gray-600  cursor-not-allowed"
        } sm:px-10 px-2 sm:py-2.5 py-1.5 rounded-xl md:rounded-2xl hover:scale-105 active:scale-105 transition-all shadow-shadow shadow-2xl text-black font-semibold hover:shadow-lg active:shadow-lg`}
      >
        to send
      </button>
      <button
        onClick={() => dispatch({ type: "openAmountModal" })}
        className="bg-pink-600 sm:px-10 px-2 sm:py-2.5 py-1.5 rounded-xl md:rounded-2xl hover:scale-105 active:scale-105 transition-all shadow-shadow shadow-2xl text-black font-semibold hover:shadow-lg active:shadow-lg"
      >
        Exit
      </button>
    </div>
  );
}

export default AddAmount;
