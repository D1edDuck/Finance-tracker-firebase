function Transaction({ category, transaction }) {
  return (
    <div className="flex justify-between rounded-3xl bg-linear-90 from-violet-light to-violet-light-opacity px-8 py-5 border-l-10 shadow-lg shadow-shadow border-white items-center text-white text-2xl  hover:translate-x-2.5 transition-all ">
      <div className="flex items-center gap-8">
        <div className="p-4 bg-violet-white rounded-2xl">
          <svg className="w-8 h-8">
            <use xlinkHref={category.img}></use>
          </svg>
        </div>
        <div>
          <h3>{category.name}</h3>
          <p className="opacity-50 text-lg">{transaction.data}</p>
        </div>
      </div>
      <div className=" flex gap-2 ">
        <p className="text-emerald-400 font-semibold">{transaction.sum}$</p>
      </div>
    </div>
  );
}

export default Transaction;
