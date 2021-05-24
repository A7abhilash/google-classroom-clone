import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { useClassroom } from "../../contexts/ClassroomContext";
import CenteredContainer from "../../containers/CenteredContainer";
import { useMsg } from "../../contexts/MsgContext";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

function JoinClass() {
  const { setMsg } = useMsg();
  const { currentUser } = useAuth();
  const { loading, joinClass } = useClassroom();
  const [classId, setClassId] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (classId) {
      let res = await joinClass(classId, currentUser.email, currentUser.uid);
      if (res.error) {
        setMsg(res.error);
      } else {
        setMsg(res.msg);
        setClassId("");
        let { id } = res.data;
        history.push(`/classroom/${id}`);
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
            Join Class
          </Typography>
          <TextField
            className="w-100 my-2"
            label="Class code"
            required
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
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
            Join
          </Button>
        </CardActions>
      </Card>
    </CenteredContainer>
  );
}

export default JoinClass;
