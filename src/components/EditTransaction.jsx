import { FilterContext } from "../features/FilterContext";

function EditTransaction() {
  return (
    <div className="bg-violet-white p-5 fixed top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md shadow-shadow shadow-md">
      <h2 className="font-semibold text-3xl">Edit a transaction</h2>
      <div
        className={`text-2xl grid grid-cols-3 items-center gap-2.5 py-5 
        }`}
        style={{
          gridTemplateColumns: "1fr 0.5rem 1fr",
        }}
      >
        <h2 className="col-start-1 col-end-2">
          <span className="font-semibold">Category:</span>
        </h2>
        <p className="row-start-2 row-end-3">
          <span className="font-semibold">sum:</span>
        </p>
        <p className="row-start-3 row-end-4">
          <span className="font-semibold">date:</span>
        </p>

        <hr className="col-start-2 row-span-full w-0.5 h-full color- bg-violet-light rounded-md justify-self-center " />
        <div className="flex flex-row gap-5">
          <p>Sum</p>
          <input
            type="number"
            placeholder={``}
            className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
          />
        </div>
        <div className="flex flex-row gap-5">
          <p>Date</p>
          <input
            type="date"
            placeholder={``}
            className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
          />
        </div>
        <div className="flex flex-row gap-5">
          <p>Note</p>
          <input
            type="text"
            placeholder={``}
            className="bg-white rounded-2xl px-3 w-40 text-black focus:outline-0 py-1"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-violet-white rounded-md cursor-pointer outline-2 outline-fuchsia-600 hover:bg-fuchsia-600 text-violet-dark p-2 text-sm hover:scale-110 font-semibold transition-all">
          Exit
        </button>
        <button className="bg-violet-white rounded-md cursor-pointer outline-2 outline-fuchsia-600 hover:outline-violet-500 hover:bg-violet-500 text-violet-dark p-2 text-sm hover:scale-110 font-semibold transition-all">
          Save
        </button>
      </div>
    </div>
  );
}

export default EditTransaction;
