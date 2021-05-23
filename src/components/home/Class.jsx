import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Class({ item }) {
  return (
    <Grid item md={4} sm={6} xs={12}>
      <Link to={`/classroom/${item.id}`} className="text-decoration-none">
        <Paper style={{ backgroundColor: "#333" }} elevation={3}>
          <div className="p-3">
            <Typography variant="body1" className="text-light">
              {item.subjectName}
            </Typography>
            <Typography variant="body2" className="mt-1 text-secondary">
              {item.className}
            </Typography>
          </div>
        </Paper>
      </Link>
    </Grid>
  );
}

export default Class;
