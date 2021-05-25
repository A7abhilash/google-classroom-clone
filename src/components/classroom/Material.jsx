import React from "react";
import { useParams } from "react-router";

function Material() {
  const { classId, materialId } = useParams();
  return (
    <div>
      <h6 className="text-light">{materialId}</h6>
    </div>
  );
}

export default Material;
