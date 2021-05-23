import { useEffect, useState } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export const ROOT_FOLDER = {
  name: "Home",
  id: null,
  parentId: null,
  path: [{ name: "Home", id: null }],
};

function useFolder(folderId = null) {
  const { currentUser } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [childFolders, setChildFolders] = useState(null);
  const [childFiles, setChildFiles] = useState(null);

  // Get current folder details
  useEffect(() => {
    if (currentUser) {
      console.log("folder id: ", folderId);
      if (folderId) {
        database
          .folders(currentUser.uid)
          .doc(folderId)
          .get()
          .then((doc) => {
            // console.log("DATA: ", doc.data());
            if (doc.data()) {
              setCurrentFolder(database.formatDocument(doc));
            } else {
              alert("No folder found...");
              setCurrentFolder({
                path: [{ name: "Go back to root", id: null }],
              });
            }
          });
      } else {
        setCurrentFolder(ROOT_FOLDER);
      }
    }
  }, [folderId, currentUser]);

  // Get all the child folders in current folder
  useEffect(() => {
    if (currentUser) {
      return database
        .folders(currentUser.uid)
        .where("parentId", "==", folderId)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          setChildFolders(
            snapshot.docs.map((doc) => database.formatDocument(doc))
          );
        });
    }
  }, [folderId, currentFolder, currentUser]);

  // Get all the child files in current folder
  useEffect(() => {
    if (currentUser) {
      return database
        .files(currentUser.uid)
        .where("parentId", "==", folderId)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          setChildFiles(
            snapshot.docs.map((doc) => database.formatDocument(doc))
          );
        });
    }
  }, [folderId, currentFolder, currentUser]);

  return { folderId, currentFolder, childFolders, childFiles };
}

export default useFolder;
