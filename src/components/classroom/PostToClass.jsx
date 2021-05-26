import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import CenteredContainer from "../../containers/CenteredContainer";
import useClass from "../../hooks/useClass";
import { useMsg } from "../../contexts/MsgContext";
import { Redirect, useParams } from "react-router";

function PostToClass() {
  const { classId } = useParams();
  const { setMsg } = useMsg();
  const {
    loading,
    currentClass,
    isTeacher,
    postNewMaterial,
    postNewAssignment,
    uploadFileToDriveAndPostContent,
  } = useClass(classId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState("");
  const [type, setType] = useState("Material");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && type) {
      if (type === "Material") {
        handlePostMaterial();
      } else {
        handlePostAssignment();
      }
    } else {
      setMsg("Empty Fields aren't allowed!");
    }
  };

  const handlePostMaterial = async () => {
    // console.log("Material");
    if (document) {
      const newMaterial = {
        classId,
        title,
        description,
        file: {},
      };
      await uploadFileToDriveAndPostContent(
        newMaterial,
        document,
        postNewMaterial
      );
    } else {
      setMsg("Material is missing");
    }
  };

  const handlePostAssignment = async () => {
    // console.log("Assignment");
    const newAssignment = {
      classId,
      title,
      description,
      file: {},
      submissions: [],
    };
    await uploadFileToDriveAndPostContent(
      newAssignment,
      document,
      postNewAssignment
    );
  };

  if (currentClass && !isTeacher) {
    alert("Unauthorized access");
    return <Redirect to={`/classroom/${classId}`} />;
  }

  return (
    <CenteredContainer>
      <Card className="col-md-6">
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Post To Class
          </Typography>
          <TextField
            className="w-100 my-2 py-0"
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
          />
          <TextField
            className="w-100 my-2 py-0"
            label="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="filled"
            multiline
            rows={7}
          />
          <div className="form-group">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-control my-2"
            >
              <option value="Material">Material</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="file"
              name="File"
              className="form-control my-2"
              onChange={(e) => {
                e.preventDefault();
                setDocument(e.target.files[0]);
              }}
            />
            <label className="text-muted">
              *Document for assignment is an optional
            </label>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            className="bg-success text-light"
            onClick={handleSubmit}
            disabled={loading}
          >
            Post
          </Button>
        </CardActions>
      </Card>
    </CenteredContainer>
  );
}

export default PostToClass;
