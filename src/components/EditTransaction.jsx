import { useContext } from "react";
import { GlobalContext } from "../features/Reducer";
import Input from "../UX/Input";
import UpdateTransaction from "../utils/UpdateTransaction";

function EditTransaction() {
  const {
    state: { editTransaction, sum, note, date },
    dispatch,
  } = useContext(GlobalContext);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-transaction-title"
    >
      <div className="bg-violet-50 w-full max-w-3xl rounded-xl shadow-lg p-5 md:p-6 relative">
        <h2
          id="edit-transaction-title"
          className="text-2xl font-semibold text-violet-dark mb-3"
        >
          Edit a transaction
        </h2>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
          <aside className="md:w-44 w-full text-xl text-violet-dark flex-shrink-0">
            <div className="mb-3">
              <div className="font-medium text-violet-dark mb-1">Name</div>
              <div className="text-xl">{editTransaction?.name ?? "—"}</div>
            </div>

            <div className="mb-3">
              <div className="font-medium text-violet-dark mb-1">
                Current sum
              </div>
              <div className="text-xl">
                {String(editTransaction?.sum ?? "—")}
              </div>
            </div>

            <div className="mb-3">
              <div className="font-medium text-violet-dark mb-1">Date</div>
              <div className="text-xl">
                {String(editTransaction?.date ?? "—")}
              </div>
            </div>

            <div>
              <div className="font-medium text-violet-dark mb-1">Note</div>
              <div className="text-xl break-words">
                {editTransaction?.note ?? "—"}
              </div>
            </div>
          </aside>

          <div className="hidden md:block w-px bg-violet-200 rounded self-stretch" />
          <div className="md:hidden h-px bg-violet-200 rounded w-full" />

          <section className="flex-1 bg-violet-white p-4 rounded-lg shadow-sm">
            <label className="flex flex-col mb-3" htmlFor="sum-input">
              <span className="text-xl font-medium text-violet-dark mb-1">
                Sum
              </span>
              <Input
                id="sum-input"
                name="sum"
                type="number"
                value={sum}
                dispatchType={"updateInput"}
                placeholder="0.00"
                aria-label="Sum"
                autoFocus
                min="0"
                step="0.01"
              />
              {!Number(sum) || Number(sum) <= 0 ? (
                <span className="text-xs text-red-600 mt-1">
                  Sum must be greater than 0
                </span>
              ) : null}
            </label>

            <label className="flex flex-col mb-3" htmlFor="date-input">
              <span className="text-xl font-medium text-violet-dark mb-1">
                Date
              </span>
              <Input
                id="date-input"
                name="date"
                type="date"
                value={date}
                dispatchType={"updateInput"}
                aria-label="Date"
              />
              {!date || isNaN(new Date(date).getTime()) ? (
                <span className="text-xs text-red-600 mt-1">
                  Please enter a valid date
                </span>
              ) : null}
            </label>

            <label className="flex flex-col mb-5" htmlFor="note-input">
              <span className="text-xl font-medium text-violet-dark mb-1">
                Note
              </span>
              <Input
                id="note-input"
                name="note"
                type="text"
                value={note}
                dispatchType={"updateInput"}
                aria-label="Note"
                placeholder="Optional"
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => dispatch({ type: "openEditModal" })}
                className="flex items-center justify-center px-4 py-2 rounded-lg border border-fuchsia-500 text-fuchsia-700 bg-transparent hover:bg-fuchsia-50 transition"
              >
                Exit
              </button>

              <div className="ml-auto flex items-center gap-3">
                <UpdateTransaction />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default EditTransaction;
