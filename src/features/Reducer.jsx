import { createContext } from "react";

export const GlobalContext = createContext(null);

export const initialData = {
  emailUser: "",
  passwordUser: "",
  userId: false,
  name: "",
  sum: "",
  date: "",
  note: "",
  type: "",
  img: "",
  category: [],
  user: null,
  transactions: [
    {
      id: 1,
      img: "shopping",
      name: "shop",
      sum: "100",
      date: "2025-08-08",
      note: "nothing",
      type: "income",
    },
  ],
  sortName: "",
  openModal: "",
  openAmount: "",
  editTransaction: {},
  refresh: false,
  wallet: {
    balance: 100,
    income: 100,
    expenses: 100,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case "login":
      return 0;
    case "updateInput":
      return {
        ...state,
        [action.payload.name]: action.payload.input,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    case "getTransactions":
      return {
        ...state,
        transactions: action.payload,
        category: setCategory(state.transactions),
        wallet: {
          income: calcCategory(state.transactions, "income"),
          expenses: calcCategory(state.transactions, "expenses"),
        },
      };
    case "resetInput":
      return {
        ...state,
        name: "",
        sum: "",
        date: "",
        note: "",
        type: "",
        balance: "",
      };
    case "selectSort":
      return {
        ...state,
        sortName: action.payload,
      };
    case "resetSort":
      return {
        ...state,
        sortName: "",
      };
    case "openEditModal":
      return {
        ...state,
        openModal: !state.openModal,
        editTransaction: action.payload,
      };
    case "openAmountModal":
      return {
        ...state,
        openAmount: !state.openAmount,
      };
    case "updateData":
      return {
        ...state,
        refresh: !state.refresh,
      };
    case "addAmount":
      return {
        ...state,
        balance: action.payload.input,
      };
  }
}

function setCategory(transactions) {
  let category = [];
  transactions.map((trans) => {
    if (!category.some((cat) => cat.name === trans.name))
      category.push({ name: trans.name, id: trans.id });
  });
  return category;
}

function calcCategory(transaction, type) {
  return transaction.reduce((acc, item) => {
    if (item.type == type) return acc + Number(item.sum);
    return acc;
  }, 0);
}
