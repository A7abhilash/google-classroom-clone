import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect, useHistory, useParams } from "react-router";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";
import useClass from "../../hooks/useClass";
import Details from "../../containers/Details";
import SubmitAssignment from "./SubmitAssignment";
import Submissions from "./Submissions";

function Assignment() {
  const { currentUser } = useAuth();
  const { setMsg } = useMsg();
  const { classId, assignmentId } = useParams();
  const {
    loading,
    assignments,
    error,
    isTeacher,
    uploadFileToDriveAndPostContent,
    submitAssignment,
  } = useClass(classId);
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState("");
  const [document, setDocument] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (assignments) {
      const data = assignments?.find((item) => item.id === assignmentId);
      if (data) {
        // console.log(data.createdAt);
        setAssignment(data);
        let doc = data.submissions.find((i) => i.email === currentUser.email);
        setSubmission(doc ? doc : null);
      } else {
        setMsg("No assignment found...");
        history.push(`/classroom/${classId}`);
      }
    }
  }, [assignments, assignmentId, classId, currentUser, history, setMsg]);

  const handleSubmit = async () => {
    if (document) {
      const newSubmission = {
        assignmentId,
        email: currentUser.email,
        file: {},
      };
      await uploadFileToDriveAndPostContent(
        newSubmission,
        document,
        submitAssignment
      );
    } else {
      setMsg("Material is missing");
    }
  };

  if (error) {
    return <Redirect to="/" />;
  }
  return assignment !== null ? (
    <Container maxWidth="lg">
      <Grid container spacing={4} className="mt-4 align-items-start">
        <Details content={assignment} />
        {!isTeacher && (
          <SubmitAssignment
            loading={loading}
            submission={submission}
            document={document}
            setDocument={setDocument}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
      {isTeacher && <Submissions submissions={assignment?.submissions} />}
    </Container>
  ) : (
    <Loading />
  );
}

export default Assignment;
