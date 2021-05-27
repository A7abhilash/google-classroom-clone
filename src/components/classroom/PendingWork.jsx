import React from "react";
import { Grid, Paper } from "@material-ui/core";

function PendingWork({ assignments, classId }) {
  return (
    <Grid
      item
      lg={3}
      md={3}
      xs={12}
      style={{ paddingLeft: 7, paddingRight: 7 }}
      className="mt-3"
    >
      <Paper style={{ height: 200, backgroundColor: "#5DA3FA" }} elevation={3}>
        <div className="p-3">
          <p className="text-light">
            <i className="fas fa-edit" style={{ marginRight: 5 }}></i>
            Pending assignments
          </p>
          {assignments?.length ? (
            <ul className="pl-2">
              {assignments?.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/classroom/${classId}/assignment/${item.id}`}
                    className="text-dark text-decoration-none"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="small">Woohoo, no work left!!</p>
          )}
        </div>
      </Paper>
    </Grid>
  );
}

export default PendingWork;
