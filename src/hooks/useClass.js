import { useEffect, useState } from "react";
import { database, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useMsg } from "../contexts/MsgContext";
import { useHistory } from "react-router";

function useClass(classId = null) {
  const { setMsg } = useMsg();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [isStudent, setIsStudent] = useState(null);
  const [isTeacher, setIsTeacher] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [error, setError] = useState(false);
  const history = useHistory();

  const hasAccessToClass = (data) => {
    setIsTeacher(data.teacher.toString() === currentUser.uid.toString());
    setIsStudent(data.students.includes(currentUser.email));
    return (
      data.teacher.toString() === currentUser.uid.toString() ||
      data.students.includes(currentUser.email)
    );
  };

  // Get current class details
  useEffect(() => {
    if (currentUser) {
      console.log("class id: ", classId);
      if (classId) {
        setLoading(true);
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
            setLoading(false);
          });
      } else {
        setCurrentClass(null);
      }
    }
  }, [classId, currentUser]);

  // Get current class' materials
  useEffect(() => {
    if (currentUser) {
      // console.log("class id: ", classId);
      if (classId) {
        setLoading(true);
        database
          .materials()
          .where("classId", "==", classId)
          .get()
          .then((data) => {
            setMaterials(data.docs.map((doc) => database.formatDocument(doc)));
            setLoading(false);
          });
      } else {
        setCurrentClass(null);
      }
    }
  }, [classId, currentUser]);

  //upload file in classroom folder
  const uploadFileToDriveAndPostContent = async (
    material,
    file,
    postContent
  ) => {
    try {
      const uploadTask = storage.ref().child(`/gd/${Date.now()}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              setMsg("Upload is paused. Progress: " + progress + "% done");
              break;
            case "running":
              setMsg("Upload is running. Progress: " + progress + "% done");
              break;
            default:
              setMsg("Upload is " + progress + "% done");
          }
        },
        (err) => {
          setMsg(err.code);
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            setMsg("Saving file to drive...");
            let newFile = {
              name: file.name,
              url: downloadURL,
              parentId: classId,
              createdAt: database.getCurrentTimestamp(),
            };
            await database.files(currentUser.uid).add(newFile);
            material["file"] = {
              url: downloadURL,
              name: file.name,
            };
            postContent(material);
          });
        }
      );
    } catch (err) {
      console.log(err);
      setMsg("Failed to upload your file!!");
    }
  };

  const postNewMaterial = async (material) => {
    try {
      setLoading(true);
      setMsg("Posting your material...");
      const res = await database.materials().add(material);
      let { id } = res;
      history.push(`/classroom/${classId}/material/${id}`);
      setMsg("New material posted");
    } catch (err) {
      console.log(err.message);
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    classId,
    isStudent,
    isTeacher,
    currentClass,
    materials,
    assignments,
    error,
    uploadFileToDriveAndPostContent,
    postNewMaterial,
  };
}

export default useClass;
