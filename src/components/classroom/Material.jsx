import { Button, Card, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import CenteredContainer from "../../containers/CenteredContainer";
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
        history.push("/");
      }
    }
  }, [materials, materialId]);

  if (error) {
    return <Redirect to="/" />;
  }

  return material !== null ? (
    <CenteredContainer>
      <Card className="col-md-4">
        <div className="px-3">
          <div className="py-2 border-bottom border-secondary">
            <Typography variant="h5">{material?.title}</Typography>
            <Typography variant="caption">
              {new Date(material?.createdAt.seconds).toDateString()}
            </Typography>
          </div>
          <div className="my-2">
            <Typography variant="body1">{material?.description}</Typography>
          </div>
          <div className="my-2">
            <Button variant="contained" color="secondary">
              <a
                href={material?.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <i
                  className="fa fa-book-open"
                  style={{ marginRight: "5px" }}
                ></i>
                {material?.file.name}
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </CenteredContainer>
  ) : (
    <Loading />
  );
}

export default Material;
