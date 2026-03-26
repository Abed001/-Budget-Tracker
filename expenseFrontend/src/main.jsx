import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import App from "./App";
import ReactDOM from "react-dom/client"; // Required for createRoot
import React from "react"; // Required for React.StrictMode
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UIProvider>
  </React.StrictMode>
);