import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../features/Reducer";
import UpdateTransaction from "../utils/UpdateTransaction";
import Input from "../UX/Input";

function EditTransaction() {
  const {
    state: { editTransaction, sum, note, date },
    dispatch,
  } = useContext(GlobalContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridTemplateColumns =
    windowWidth > 430 ? "15rem 0.5rem 15rem" : "8rem 0.5rem 12rem";

  return (
    <div className="bg-violet-white p-5 fixed top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-shadow shadow-md">
      <h2 className="font-semibold text-3xl">Edit a transaction</h2>
      <div
        className={`text-2xl grid grid-cols-3 items-center grid-rows-4 gap-2.5 py-5 
        }`}
        style={{
          gridTemplateColumns: gridTemplateColumns,
        }}
      >
        <div className="col-start-1 col-end-2 gap-2 flex flex-col sm:flex-row">
          <p className="font-semibold">name:</p>
          <p>{editTransaction.name}</p>
        </div>
        <div className="row-start-2 row-end-3 flex gap-2 flex-col sm:flex-row">
          <p className="font-semibold">sum:</p>
          <p>{editTransaction.sum}</p>
        </div>
        <div className="row-start-3 row-end-4 flex flex-col gap-2 sm:flex-row">
          <p className="font-semibold">date:</p>
          <p>{editTransaction.date}</p>
        </div>
        <div className="row-start-4 flex flex-col gap-2 sm:flex-row">
          <p className="font-semibold">note:</p>
          <p>{editTransaction.note}</p>
        </div>
        <hr className="col-start-2 row-span-full w-0.5 h-full  bg-violet-light rounded-md justify-self-center " />
        <div className=" gap-2 flex flex-row">
          <p>Sum</p>
          <Input
            placeholder={editTransaction.sum}
            type={"number"}
            dispatchType={"updateInput"}
            value={sum}
            name={"sum"}
          />
        </div>
        <div className=" gap-2 flex flex-row">
          <p>Date</p>
          <Input
            placeholder={editTransaction.date}
            type={"date"}
            dispatchType={"updateInput"}
            value={date}
            name={"date"}
          />
        </div>
        <div className=" gap-2 flex flex-row">
          <p>Note</p>
          <Input
            placeholder={editTransaction.note}
            type={"text"}
            dispatchType={"updateInput"}
            value={note}
            name={"note"}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: "openEditModal" })}
          className="bg-violet-white rounded-md cursor-pointer outline-2 outline-fuchsia-600 hover:bg-fuchsia-600 text-violet-dark px-4 py-2 text-lg hover:scale-110 font-semibold transition-all"
        >
          Exit
        </button>
        <UpdateTransaction />
      </div>
    </div>
  );
}

export default EditTransaction;
