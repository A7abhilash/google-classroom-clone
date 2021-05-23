import React, { useState, useContext } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

const ClassroomContext = React.createContext();

export function useClassroom() {
  return useContext(ClassroomContext);
}

export function ClassroomProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  async function getClassesAsTeacher() {
    try {
      setLoading(true);
      let data = await database
        .classrooms()
        .where("teacher", "==", currentUser.uid)
        .get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function getClassesAsStudent() {
    try {
      setLoading(true);
      let data = await database
        .classrooms()
        .where("students", "array-contains", currentUser.uid)
        .get();
      data = data.docs.map((doc) => database.formatDocument(doc));
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

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
    <ClassroomContext.Provider
      value={{ loading, getClassesAsTeacher, getClassesAsStudent, createClass }}
    >
      {children}
    </ClassroomContext.Provider>
  );
}
