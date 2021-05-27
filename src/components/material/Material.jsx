import { Button, Card, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import CenteredContainer from "../../containers/CenteredContainer";
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
  }, [materials, materialId]);

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
