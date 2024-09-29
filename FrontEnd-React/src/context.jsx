import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <GlobalContext.Provider value={{ userInfo, showSideBar, setShowSideBar }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
