import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import { addDoc, collection } from "firebase/firestore";
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
      alert("You is not login ");
      return;
    }

    try {
      await addDoc(collection(db, "transactions"), {
        userId,
        name,
        sum: parseFloat(sum),
        date,
        note,
        type,
        img: name,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      console.error("Ошибка добавления транзакции", error);
    }
    dispatch({ type: "resetInput" });
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
      className={`px-20 py-5 rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-shadow hover:shadow-lg ${
        !checkInput() ? "bg-gray-400 cursor-not-allowed" : "bg-violet-500"
      }`}
    >
      Save
    </button>
  );
}

export default SetTransaction;
