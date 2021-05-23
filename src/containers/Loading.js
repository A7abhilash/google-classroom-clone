import React from "react";
import CenteredContainer from "./CenteredContainer";

function Loading() {
  return (
    <CenteredContainer>
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </CenteredContainer>
  );
}

export default Loading;
