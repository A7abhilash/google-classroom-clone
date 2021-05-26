import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";
import useClass from "../../hooks/useClass";

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
  }, [assignments, assignmentId]);

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
    <Container maxWidth="md">
      <Grid container spacing={4} className="mt-4 align-items-start">
        <Grid item md={8} xs={12} className="my-2">
          <div className="pb-2 border-bottom border-secondary">
            <Typography variant="h4" className="text-light">
              {assignment?.title}
            </Typography>
            <Typography variant="caption" className="text-muted">
              {new Date(Date(assignment?.createdAt.seconds)).toLocaleString()}
            </Typography>
          </div>
          <div className="my-2 text-light">
            <Typography variant="body1">{assignment?.description}</Typography>
          </div>
          {assignment?.file.url && (
            <div className="my-2">
              <Button variant="contained" color="secondary">
                <a
                  href={assignment?.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <i
                    className="fa fa-book-open"
                    style={{ marginRight: "5px" }}
                  ></i>
                  {assignment?.file.name}
                </a>
              </Button>
            </div>
          )}
        </Grid>
        {!isTeacher && (
          <Grid
            item
            md={3}
            xs={12}
            style={{
              backgroundColor: "#5DA3FA",
              borderRadius: 10,
              marginLeft: "auto",
            }}
            className="my-2"
          >
            <Typography variant="h6" className="text-dark">
              Submission
            </Typography>
            <div className="d-flex align-items-center my-2">
              <label
                className="btn btn-sm btn-outline-light"
                style={{ marginRight: "10px" }}
              >
                <input
                  type="file"
                  style={{
                    position: "absolute",
                    left: "-100vh",
                    opacity: 0,
                  }}
                  disabled={loading || submission !== null}
                  onChange={(e) => {
                    e.preventDefault();
                    setDocument(e.target.files[0]);
                  }}
                />
                <i className="fas fa-file-plus fa-lg"></i>
              </label>
              {(document || submission !== null) && (
                <p className="ml-2 text-light">
                  {document.name || submission.file.name}
                </p>
              )}
            </div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleSubmit}
              disabled={loading || submission !== null}
            >
              Submit Assignment
            </Button>
          </Grid>
        )}
      </Grid>
      {isTeacher && (
        <Grid
          container
          spacing={4}
          className="mt-2 p-2 border-top border-warning"
        >
          <Grid item lg={12} xs={12}>
            <p className="text-warning mt-1 mb-0">
              Submissions ({assignment?.submissions.length})
            </p>
          </Grid>
          {assignment?.submissions.length ? (
            <p className="text-light">{assignment?.submissions.length}</p>
          ) : (
            <p className="text-danger">No submissions yet...</p>
          )}
        </Grid>
      )}
    </Container>
  ) : (
    <Loading />
  );
}

export default Assignment;
