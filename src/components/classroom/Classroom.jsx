import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import Loading from "../../containers/Loading";
import useClass from "./../../hooks/useClass";
import SelectOptions from "./SelectOptions";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import DisplayClassPosts from "./DisplayClassPosts";
import DisplayClassPeople from "./DisplayClassPeople";

function Classroom() {
  const { currentUser } = useAuth();
  const { classId } = useParams();
  const { error, currentClass, materials, isTeacher } = useClass(classId);
  const [selectedOption, setSelectedOption] = useState("Assignments");

  const switchContent = () => {
    switch (selectedOption) {
      case "Assignments":
        return (
          <DisplayClassPosts
            items={materials}
            type="assignment"
            classLink={`/classroom/${classId}`}
          />
        );
      case "People":
        return (
          <DisplayClassPeople
            people={currentClass?.students}
            teacher={currentClass?.teacher}
          />
        );
      default:
        return (
          <DisplayClassPosts
            items={materials}
            type="material"
            classLink={`/classroom/${classId}`}
          />
        );
    }
  };

  if (error) {
    return <Redirect to="/" />;
  }

  return currentClass !== null ? (
    <Container maxWidth="md">
      <Grid>
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
          {isTeacher && (
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
          <Grid
            item
            lg={3}
            md={3}
            xs={12}
            style={{ paddingLeft: 7, paddingRight: 7 }}
          >
            <Paper
              style={{ height: 200, backgroundColor: "#5DA3FA" }}
              elevation={3}
            >
              <div className="p-3">
                <p>Pending assignments</p>
              </div>
            </Paper>
          </Grid>
          <Grid item lg={8} md={8} xs={12} className="mx-auto mt-3 mt-md-0">
            <SelectOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            {materials && switchContent()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loading />
  );
}

export default Classroom;
