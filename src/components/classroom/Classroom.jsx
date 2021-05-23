import React from "react";
import { useParams } from "react-router";

function Classroom() {
  const { classId } = useParams();
  return (
    <div>
      <h6 className="text-light">{classId}</h6>
    </div>
  );
}

export default Classroom;
