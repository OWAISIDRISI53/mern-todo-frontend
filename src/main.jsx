// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserState from "./context/UserState.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <UserState>
    <App />
  </UserState>
  // </StrictMode>
);
