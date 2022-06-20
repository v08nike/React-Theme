import React, { useState, useEffect, createContext } from "react";
import axios from 'axios'
import { userData } from "./UserData";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [data, setData] = useState(userData);

  useEffect(async () => {
    let newData;
    newData = await axios.get(process.env.REACT_APP_BASE_URL + 'users');
    let defaultData = newData.data.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...defaultData]);
  }, []);

  return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
  // return <UserContext.Provider value={{ contextData: [data, setData] }}>{props.children}</UserContext.Provider>;
};
