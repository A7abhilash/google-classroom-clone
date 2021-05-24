import { Typography } from "@material-ui/core";
import React from "react";
import CenteredContainer from "../../containers/CenteredContainer";

function NoClass() {
  return (
    <CenteredContainer>
      <div className="d-block text-center">
        <img
          src={require("../../empty.png")}
          alt="No class joined"
          className="img-fluid"
          style={{ height: 200 }}
        />
        <Typography variant="body1" className="text-danger">
          No classes joined or created by you...
        </Typography>
      </div>
    </CenteredContainer>
  );
}

export default NoClass;
