import React from "react";
import { Grid, Paper } from "@material-ui/core";

function Submissions({ submissions }) {
  return (
    <Grid
      container
      item
      md={8}
      xs={12}
      spacing={3}
      className="mt-2 p-2 border-top border-warning mx-auto"
    >
      <Grid item md={12} xs={12}>
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
          <Grid item lg={4} md={6} xs={12} key={item.email + index}>
            <Paper elevation={3} style={{ backgroundColor: "#333" }}>
              <div className="p-3">
                <div className="text-light">
                  <p>{item.email}</p>
                </div>
                <div>
                  <a
                    href={item.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none btn btn-sm btn-outline-info"
                  >
                    <small>
                      <i
                        className="fas fa-external-link"
                        style={{ marginRight: 5 }}
                      ></i>
                      {item.file.name}
                    </small>
                  </a>
                </div>
              </div>
            </Paper>
          </Grid>
        ))
      ) : (
        <p className="text-danger">No submissions yet...</p>
      )}
    </Grid>
  );
}

export default Submissions;
