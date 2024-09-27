import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  return (
    <GlobalContext.Provider value={{ userInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
