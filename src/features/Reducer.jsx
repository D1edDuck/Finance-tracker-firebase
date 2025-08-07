import { createContext } from "react";

export const GlobalContext = createContext(null);

export const initialData = {
  emailUser: "",
  passwordUser: "",
  userId: "",
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
      };
    case "getCategory":
      return {
        ...state,
        category: setCategory(state.transactions),
      };
    case "resetInput":
      return {
        ...state,
        name: "",
        sum: "",
        date: "",
        note: "",
        type: "",
      };
  }
}

function setCategory(transactions) {
  let category = [];
  transactions.map((trans) => {
    category.push({ name: trans.name, id: trans.id });
  });
  return category;
}
