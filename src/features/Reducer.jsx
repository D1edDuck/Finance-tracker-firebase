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
  sortName: "",
  openModal: "",
  editTransaction: {},
  refresh: false,
  userLogin: false,
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
    case "updateData":
      return {
        ...state,
        refresh: !state.refresh,
      };
    case "checkUser":
      return {
        ...state,
        userLogin: checkUser(state.user.id),
      };
  }
}

function checkUser(id) {
  if (id == undefined) return false;
  else return true;
}

function setCategory(transactions) {
  let category = [];
  transactions.map((trans) => {
    if (!category.some((cat) => cat.name === trans.name))
      category.push({ name: trans.name, id: trans.id });
  });
  return category;
}
