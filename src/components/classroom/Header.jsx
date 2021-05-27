import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Header({ currentClass, isTeacher }) {
  return (
    <Grid
      item
      lg={12}
      xs={12}
      className="p-3 mt-4 d-flex justify-content-between"
      style={{
        backgroundColor: "#1B98F5",
        borderRadius: 10,
      }}
    >
      <div className="d-block">
        <Typography variant="h4">{currentClass?.subjectName}</Typography>
        <Typography variant="h6" color="secondary">
          {currentClass?.className} - {currentClass?.subjectCode}
        </Typography>
      </div>
      {isTeacher && (
        <div>
          <Link
            className="text-decoration-none"
            to={`/classroom/${currentClass?.id}/post`}
          >
            <Button variant="contained" className="bg-info" size="small">
              Post
            </Button>
          </Link>
        </div>
      )}
    </Grid>
  );
}

export default Header;
