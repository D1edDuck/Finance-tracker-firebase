import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import Filter from "./pages/Filter";
import NotFound from "./pages/NotFound";

function App() {
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
          path: "filter",
          element: <Filter />,
        },
        {
          path: "addTransaction",
          element: <AddTransaction />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
