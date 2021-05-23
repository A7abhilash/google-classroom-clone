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
import { useMsg } from "../../contexts/MsgContext";
import { useClassroom } from "../../contexts/ClassroomContext";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

function CreateClass() {
  const { setMsg } = useMsg();
  const { currentUser } = useAuth();
  const { loading, createClass } = useClassroom();
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (className && subjectName && subjectCode) {
      let newClass = {
        className,
        subjectName,
        subjectCode,
        teacher: { userId: currentUser.uid, email: currentUser.email },
        students: [],
        createdAt: database.getCurrentTimestamp(),
      };
      let res = await createClass(newClass);
      if (res.error) {
        setMsg(res.error);
      } else {
        console.log(database.formatDocument(res.data));
        setMsg(res.msg);
        setClassName("");
        setSubjectName("");
        setSubjectCode("");
      }
    } else {
      setMsg("Empty Fields aren't allowed!");
    }
  };

  return (
    <CenteredContainer>
      <Card className="col-md-4">
        <CardContent>
          <Typography variant="h6" color="textSecondary">
            Create New Class
          </Typography>
          <TextField
            className="w-100 my-2"
            label="Class name"
            required
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <TextField
            className="w-100 my-2"
            label="Subject name"
            required
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <TextField
            className="w-100 my-2"
            label="Subject code"
            required
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
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

export default CreateClass;
