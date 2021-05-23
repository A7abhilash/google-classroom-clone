import React, { useState, useContext } from "react";
import { database } from "../firebase";
import { useMsg } from "./MsgContext";

const ClassroomContext = React.createContext();

export function useClassroom() {
  return useContext(ClassroomContext);
}

export function ClassroomProvider({ children }) {
  const [loading, setLoading] = useState(false);

  async function createClass(newClass) {
    try {
      setLoading(true);
      const data = await database.classrooms().add(newClass);
      //   console.log(res);
      return { data, msg: "New class created" };
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClassroomContext.Provider value={{ loading, createClass }}>
      {children}
    </ClassroomContext.Provider>
  );
}
