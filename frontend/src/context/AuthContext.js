import React, { createContext, useEffect, useState } from "react";

import {
  fetchUserData,
  removeUserData,
  saveUserData,
} from "../utility/storage";

export const AuthContext = createContext({
  user: null,
  tasks: [],
  setUser: () => {},
  setTasks: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    const user = fetchUserData();
    if (user) {
      setUser(user);
    }
  };

  const login = (data) => {
    setUser(data);
    saveUserData(data);
  };

  const logout = () => {
    setUser(null);
    removeUserData();
  };

  return (
    <AuthContext.Provider value={{ user, tasks, setTasks, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
