import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import { Badge, Button, Container, Grid, Typography } from "@material-ui/core";
import Loading from "../../containers/Loading";
import useClass from "./../../hooks/useClass";
import SidebarOptions from "./SidebarOptions";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function Classroom() {
  const { currentUser } = useAuth();
  const { classId } = useParams();
  const { error, currentClass } = useClass(classId);
  const [selectedOption, setSelectedOption] = useState("Materials");

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  if (error) {
    return <Redirect to="/" />;
  }

  return currentClass !== null ? (
    <Container maxWidth="md">
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
          <Typography variant="h4">{currentClass.subjectName}</Typography>
          <Typography variant="h6" className="text-light">
            {currentClass.className} - {currentClass.subjectCode}
          </Typography>
        </div>
        {currentClass.teacher.toString() === currentUser.uid.toString() && (
          <div>
            <Link
              className="text-decoration-none"
              to={`/classroom/${currentClass.id}/post`}
            >
              <Button variant="contained" color="secondary" size="small">
                Post
              </Button>
            </Link>
          </div>
        )}
      </Grid>
      <Grid container alignItems="flex-start" className="mt-4">
        <Grid item lg={3} xs={12} style={{ paddingLeft: 15, paddingRight: 15 }}>
          <SidebarOptions
            selectedOption={selectedOption}
            handleSelection={handleSelection}
          />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loading />
  );
}

export default Classroom;
