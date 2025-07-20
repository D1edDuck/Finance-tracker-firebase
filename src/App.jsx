import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import AddTransaction from "./pages/AddTransaction";
import { Filter } from "./features/FilterContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Filter>
              <Home />
            </Filter>
          ),
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "addTransaction",
          element: <AddTransaction />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
