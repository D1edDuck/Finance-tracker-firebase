import useFetchData from "../hooks/useFetchData";

function Balance() {
  const {
    state: { data, status, loading, errMessage },
  } = useFetchData("http://localhost:9000/wallet");
  return (
    <div className="flex justify-between px-24 py-8 text-white font-semibold text-4xl bg-linear-180 from-violet-dark to-violet-dark-opacity rounded-4xl to-65% shadow-shadow shadow-2xl mb-8">
      {status == "error" ? (
        <h2>Error: {errMessage}</h2>
      ) : (
        <>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${data.balance}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Balance</p>
          </div>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${data?.income}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Income</p>
          </div>
          <div className="text-center space-y-5">
            <h2>{!loading ? `${data?.expenses}$` : "loading.."}</h2>
            <p className="text-2xl opacity-45">Expenses</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Balance;
