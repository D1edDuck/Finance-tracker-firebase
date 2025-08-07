function Transaction({ transaction }) {
  return (
    <div className="flex justify-between rounded-3xl bg-linear-90 from-violet-light to-violet-light-opacity px-8 py-5 group hover:border-l-fuchsia-600 border-l-8 hover:border-l-12 hover:shadow-xl shadow-lg shadow-shadow border-white items-center text-white text-2xl  hover:translate-x-2 transition-all ">
      <div className="flex items-center gap-8">
        <div className="p-4 bg-violet-white rounded-2xl">
          <svg className="w-8 h-8 fill-violet-dark transition-all">
            <use xlinkHref={`/symbol-defs.svg#icon-${transaction.img}`}></use>
          </svg>
        </div>
        <div>
          <h3>{transaction.name}</h3>
          <p className="opacity-50 text-lg">{transaction.date}</p>
        </div>
      </div>
      <div className=" flex gap-8 ">
        <p
          className={` font-semibold ${
            transaction.category === "income"
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          {transaction.sum}$
        </p>
        <button className="bg-violet-white rounded-md cursor-pointer group-hover:bg-fuchsia-600 text-violet-dark p-2 text-sm hover:scale-110 font-semibold transition-all">
          Edit
        </button>
      </div>
    </div>
  );
}

export default Transaction;
