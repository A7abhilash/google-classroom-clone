import React from "react";
import { useParams } from "react-router";

function Assignment() {
  const { assignmentId } = useParams();
  return (
    <div>
      <p className="text-light">{assignmentId}</p>
    </div>
  );
}

export default Assignment;
