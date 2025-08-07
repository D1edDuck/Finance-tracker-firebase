import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useReducer } from "react";
import { initialData, reducer } from "./features/Reducer";
import { analytics, app, auth, db } from "./features/firebase";
import { GlobalContext } from "./features/Reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Login />,
        },
        {
          path: "/addTransaction",
          element: <AddTransaction />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <GlobalContext.Provider
      value={{ state, dispatch, app, analytics, db, auth }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;
