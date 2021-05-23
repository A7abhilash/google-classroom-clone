import React, { useState, useContext } from "react";

const MsgContext = React.createContext();

export function useMsg() {
  return useContext(MsgContext);
}

export function MsgProvider({ children }) {
  const [msg, setMsg] = useState(null);

  return (
    <MsgContext.Provider value={{ msg, setMsg }}>
      {children}
    </MsgContext.Provider>
  );
}
