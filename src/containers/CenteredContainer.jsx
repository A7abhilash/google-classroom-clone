import React from "react";

function CenteredContainer({ children }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center pt-5"
      style={{ minHeight: "75vh" }}
    >
      {children}
    </div>
  );
}

export default CenteredContainer;
