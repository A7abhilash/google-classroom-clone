import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

function SubmitAssignment({ loading, submission, setDocument, handleSubmit }) {
  return (
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
  );
}

export default SubmitAssignment;
