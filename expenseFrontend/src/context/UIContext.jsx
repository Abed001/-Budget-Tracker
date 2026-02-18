import { createContext, useState, useContext } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "info" }), 3000);
  };

  return (
    <UIContext.Provider value={{ loading, setLoading, toast, showToast }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);