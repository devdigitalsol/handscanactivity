import { createContext, useState } from "react";

export const Context = createContext();

export const AppState = ({ children }) => {
  const [user, setUser] = useState(null);
  const store = {
    user,
    setUser,
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
