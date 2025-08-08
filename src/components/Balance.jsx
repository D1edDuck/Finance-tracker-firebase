function Balance() {
  return (
    <div className="flex md:px-24 md:py-12 justify-between px-12 py-6 sm:px-24 sm:py-6 text-white font-semibold bg-linear-180 from-violet-dark to-violet-dark-opacity rounded-xl md:rounded-4xl to-65% shadow-shadow shadow-2xl mb-8">
      <>
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-0">
          <h2>100$</h2>
          <p className="text-lg sm:text-2xl opacity-45">Balance</p>
        </div>
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-0">
          <h2>100$</h2>
          <p className="text-lg sm:text-2xl opacity-45">Income</p>
        </div>
        <div className="text-center text-2xl sm:text-4xl sm:space-y-5 space-y-  ">
          <h2>100$</h2>
          <p className="text-lg sm:text-2xl opacity-45">Expenses</p>
        </div>
      </>
    </div>
  );
}

export default Balance;
