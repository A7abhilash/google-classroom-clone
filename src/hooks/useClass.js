import { useEffect, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useMsg } from "../contexts/MsgContext";

export const ROOT_FOLDER = {
  name: "Home",
  id: null,
  parentId: null,
  path: [{ name: "Home", id: null }],
};

function useFolder(classId = null) {
  const { setMsg } = useMsg();
  const { currentUser } = useAuth();
  const [currentClass, setCurrentClass] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [error, setError] = useState(false);

  const hasAccessToClass = (data) =>
    data.teacher.toString() === currentUser.uid.toString() ||
    data.students.includes(currentUser.email);

  // Get current class details
  useEffect(() => {
    if (currentUser) {
      console.log("class id: ", classId);
      if (classId) {
        database
          .classrooms()
          .doc(classId)
          .get()
          .then((doc) => {
            // console.log("DATA: ", doc.data());
            let data = null;
            if (
              doc.data() &&
              hasAccessToClass((data = database.formatDocument(doc)))
            ) {
              setCurrentClass(data);
            } else {
              setMsg("No class found...");
              setError(true);
            }
          });
      } else {
        setCurrentClass(null);
      }
    }
  }, [classId, currentUser]);

  return { classId, currentClass, materials, assignments, error };
}

export default useFolder;
