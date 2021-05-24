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
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";
import { useParams } from "react-router";
import Loading from "../../containers/Loading";

function PostToClass() {
  const { classId } = useParams();
  const { currentUser } = useAuth();
  const { setMsg } = useMsg();
  const { loading, currentClass } = useClass(classId);
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

  const handlePostMaterial = () => {
    console.log("Material");
    if (document) {
      //
    } else {
      setMsg("Material is missing");
    }
  };
  const handlePostAssignment = () => {
    console.log("Assignment");
  };

  if (loading) {
    return <Loading />;
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
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control my-2"
          >
            <option value="Material">Material</option>
            <option value="Assignment">Assignment</option>
          </select>
          <input
            type="file"
            name="File"
            className="form-control my-2"
            onChange={(e) => {
              e.preventDefault();
              setDocument(e.target.files[0]);
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            className="bg-success text-light"
            onClick={handleSubmit}
            disabled={loading}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    </CenteredContainer>
  );
}

export default PostToClass;
