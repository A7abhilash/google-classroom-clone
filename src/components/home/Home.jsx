import React, { useEffect, useState } from "react";
import { Container, Divider, Grid } from "@material-ui/core";
import { useClassroom } from "../../contexts/ClassroomContext";
import Class from "./Class";
import NoClass from "./NoClass";
import Loading from "../../containers/Loading";
import AddClass from "./AddClass";

function Home() {
  const [classesAsTeacher, setClassesAsTeacher] = useState(null);
  const [classesAsStudent, setClassesAsStudent] = useState(null);
  const { loading, getClassesAsTeacher, getClassesAsStudent } = useClassroom();

  useEffect(() => {
    getClassesAsTeacher().then((docs) => setClassesAsTeacher(docs));
  }, []);

  useEffect(() => {
    getClassesAsStudent().then((docs) => setClassesAsStudent(docs));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      {classesAsTeacher?.length && (
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <p className="text-warning mb-0 mt-1">Teacher</p>
          </Grid>
          {classesAsTeacher.map((item) => (
            <Class item={item} key={item.id} />
          ))}
        </Grid>
      )}

      {classesAsTeacher?.length && classesAsStudent?.length && (
        <Divider className="my-3 bg-secondary" />
      )}

      {classesAsStudent?.length && (
        <Grid container spacing={3}>
          <Grid item lg={12} xs={12}>
            <p className="text-warning mt-1 mb-0">Student</p>
          </Grid>
          {classesAsStudent.map((item) => (
            <Class item={item} key={item.id} />
          ))}
        </Grid>
      )}

      {classesAsTeacher?.length === 0 && classesAsStudent?.length === 0 && (
        <NoClass />
      )}

      <AddClass />
    </Container>
  );
}

export default Home;
