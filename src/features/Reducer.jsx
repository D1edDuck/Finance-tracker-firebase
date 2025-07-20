export const initialData = {
  data: {},
  status: "loading",
  errMessage: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "initData":
      return {
        ...state,
        data: action.payload,
        status: "ready",
      };
    case "failedFetch":
      return {
        ...state,
        status: "error",
        errMessage: action.payload,
      };
  }
}
