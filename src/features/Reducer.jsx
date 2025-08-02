export const initialData = {
  transaction: [],
  filterTransaction: [],
  balance: [],
  open: false,
  edit: [],
  status: "loading",
  errMessage: "",
  inputValue: {
    name: "",
    amount: "",
    date: "",
    note: "",
    category: "",
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "initTransaction":
      return {
        ...state,
        transaction: action.payload,
        status: "ready",
      };
    case "initFilter":
      return {
        ...state,
        filterTransaction: action.payload,
        status: "ready",
      };
    case "initData":
      return {
        ...state,
        balance: action.payload,
        status: "ready",
      };
    case "failedFetch":
      return {
        ...state,
        status: "error",
        errMessage: action.payload,
      };
    case "updateAmount":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          amount: action.payload,
        },
      };
    case "updateDate":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          date: action.payload,
        },
      };
    case "updateNote":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          note: action.payload,
        },
      };
    case "updateName":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          name: action.payload,
        },
      };
    case "updateCategory":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          category: action.payload,
        },
      };
    case "reset":
      return {
        ...state,
        inputValue: {
          ...state.inputValue,
          amount: "",
          date: "",
          note: "",
          category: "",
          type: "",
        },
      };
    case "newTransaction":
      return {
        ...state,
        transaction: [
          ...state.transaction,
          {
            id: Date.now(),
            name: action.payload.name,
            img: `/symbol-defs.svg#icon-${action.payload.name.toLowerCase()}`,
            category: action.payload.category,
            story: [
              {
                id: Date.now(),
                data: action.payload.date,
                sum: Number(action.payload.amount),
                note: action.payload.note,
              },
            ],
          },
        ],
        inputValue: {
          ...state.inputValue,
          amount: "",
          date: "",
          note: "",
          name: "",
          category: "",
        },
      };
    case "editTransaction":
      return {
        ...state,
        transaction: state.transaction.map((category) => {
          if (category.id === action.payload.idCategory) {
            return {
              ...category,
              story: category.story.map((story) => {
                if (story.id === action.payload.idTransaction) {
                  return {
                    ...story,
                    data: state.inputValue.date || story.data,
                    note: state.inputValue.note || story.note,
                    sum: state.inputValue.amount || story.sum,
                  };
                }
                return story;
              }),
            };
          }
          return category;
        }),
        inputValue: {
          ...state.inputValue,
          amount: "",
          date: "",
          note: "",
          type: "",
          category: "",
        },
      };
    case "sortByName":
      return {
        ...state,
        filterTransaction: state.transaction.filter(
          (category) => action.payload === category.name
        ),
      };
    case "sortByCategory":
      return {
        ...state,
        filterTransaction: state.transaction.filter(
          (category) => action.payload === category.category
        ),
      };
    case "resetSort":
      return {
        ...state,
        filterTransaction: state.transaction,
      };
    case "openModal":
      return { ...state, open: !state.open, edit: action.payload };
  }
}
