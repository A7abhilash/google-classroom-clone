import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";

function Details({ content }) {
  return (
    <Grid item md={8} xs={12} className="mb-1 mx-auto">
      <div className="pb-2 border-bottom border-secondary">
        <Typography variant="h4" className="text-light">
          <i className="fas fa-clipboard-list" style={{ marginRight: 10 }}></i>
          {content?.title}
        </Typography>
        <Typography variant="caption" className="text-muted">
          {new Date(Date(content?.createdAt.seconds)).toLocaleString()}
        </Typography>
      </div>
      <div className="my-2 text-light">
        <Typography variant="body1">{content?.description}</Typography>
      </div>
      {content?.file.url && (
        <div className="mb-2 mt-4">
          <Button variant="contained" color="secondary">
            <a
              href={content?.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark"
            >
              <i className="fa fa-book-open" style={{ marginRight: "5px" }}></i>
              {content?.file.name}
            </a>
          </Button>
        </div>
      )}
    </Grid>
  );
}

export default Details;
