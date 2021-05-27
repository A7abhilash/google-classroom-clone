import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Redirect, useHistory, useParams } from "react-router";
import Details from "../../containers/Details";
import Loading from "../../containers/Loading";
import { useMsg } from "../../contexts/MsgContext";
import useClass from "../../hooks/useClass";

function Material() {
  const { setMsg } = useMsg();
  const { classId, materialId } = useParams();
  const { materials, error } = useClass(classId);
  const [material, setMaterial] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (materials) {
      const data = materials?.find((item) => item.id === materialId);
      if (data) {
        // console.log(data);
        setMaterial(data);
      } else {
        setMsg("No material found...");
        history.push(`/classroom/${classId}`);
      }
    }
  }, [materials, materialId, classId, setMsg, history]);

  if (error) {
    return <Redirect to="/" />;
  }

  return material !== null ? (
    <Grid container spacing={4} className="mt-4 align-items-start">
      <Details content={material} />
    </Grid>
  ) : (
    <Loading />
  );
}

export default Material;
