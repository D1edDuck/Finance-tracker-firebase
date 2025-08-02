import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FilterState } from "./features/FilterContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterState>
      <App />
    </FilterState>
  </StrictMode>
);
