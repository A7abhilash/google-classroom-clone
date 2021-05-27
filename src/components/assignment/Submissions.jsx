import React from "react";
import { Grid } from "@material-ui/core";

function Submissions({ submissions }) {
  return (
    <Grid container item lg={6} md={12} xs={12} spacing={3}>
      <Grid item lg={12} md={12} xs={12}>
        <p className="text-success mt-1 mb-0">
          <i
            className="fas fa-check-circle fa-lg"
            style={{ marginRight: 10 }}
          ></i>
          Submissions ({submissions.length})
        </p>
      </Grid>
      {submissions.length ? (
        submissions.map((item, index) => (
          <Grid item lg={12} xs={12} key={item.email + index}>
            <div
              className={`d-flex align-items-center justify-content-between pt-1 px-3 ${
                index !== submissions.length - 1
                  ? "border-bottom border-secondary"
                  : ""
              }`}
            >
              <div className="text-light">
                <p>{item.email}</p>
              </div>
              <div>
                <a
                  href={item.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none btn btn-sm btn-outline-info mb-2"
                >
                  <i
                    className="fas fa-external-link"
                    style={{ marginRight: 5 }}
                  ></i>
                  View Submission
                </a>
              </div>
            </div>
          </Grid>
        ))
      ) : (
        <p className="text-danger">No submissions yet...</p>
      )}
    </Grid>
  );
}

export default Submissions;
