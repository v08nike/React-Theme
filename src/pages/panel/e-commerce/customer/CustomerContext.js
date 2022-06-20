import React, { useState, createContext } from "react";
import { CustomerData } from "./CustomerData";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [data, setData] = useState(CustomerData);

  return <CustomerContext.Provider value={{ contextData: [data, setData] }}>{props.children}</CustomerContext.Provider>;
};
