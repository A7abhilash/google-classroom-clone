import React, { useState, useContext } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

//For google drive
const ROOT_FOLDER = {
  name: "Home",
  id: null,
  parentId: null,
  path: [{ name: "Home", id: null }],
};

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
      let res = await database
        .classrooms()
        .where("teacher", "==", currentUser.email)
        // .orderBy("createdAt")
        .get();
      const data = res.docs.map((doc) => database.formatDocument(doc));
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
      let res = await database
        .classrooms()
        .where("students", "array-contains", currentUser.email)
        // .orderBy("createdAt")
        .get();
      const data = res.docs.map((doc) => database.formatDocument(doc));
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
      await createClassroomFolder(newClass.subjectName, data.id);
      return { data, msg: "New class created" };
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

  async function joinClass(classId, email, userId) {
    try {
      setLoading(true);
      const res = await database.classrooms().doc(classId).get();
      // console.log(res);
      if (!res.data()) {
        return { error: "Invalid class id" };
      }

      const data = database.formatDocument(res);
      let msg = "";

      if (data.teacher.toString() === userId.toString()) {
        msg = "You are already the teacher of this class";
      } else if (data.students.includes(email)) {
        msg = "You are already a student of this class";
      } else {
        await database
          .classrooms()
          .doc(classId)
          .update({ students: [...data.students, email] });
        msg = "New class joined";
        await createClassroomFolder(data.subjectName, classId);
      }

      return { data, msg };
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  }

  //create folder for new classroom
  const createClassroomFolder = async (name, id) => {
    try {
      let path = [...ROOT_FOLDER.path];
      let newFolder = {
        name: `${name} - Classroom`,
        parentId: null,
        path,
        createdAt: database.getCurrentTimestamp(),
      };
      await database.folders(currentUser.uid).doc(id).set(newFolder);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ClassroomContext.Provider
      value={{
        loading,
        getClassesAsTeacher,
        getClassesAsStudent,
        createClass,
        joinClass,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
}
