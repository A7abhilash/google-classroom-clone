import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Typography } from "@material-ui/core";
import { useClassroom } from "../../contexts/ClassroomContext";
import Class from "./Class";

function Home() {
  const [classesAsTeacher, setClassesAsTeacher] = useState(null);
  const [classesAsStudent, setClassesAsStudent] = useState(null);
  const { getClassesAsTeacher, getClassesAsStudent } = useClassroom();

  useEffect(() => {
    getClassesAsTeacher().then((docs) => setClassesAsTeacher(docs));
  }, []);

  useEffect(() => {
    getClassesAsStudent().then((docs) => setClassesAsStudent(docs));
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        {classesAsTeacher?.length && (
          <Grid container spacing={3}>
            <Grid item lg={12} xs={12}>
              <Typography className="text-warning my-0" variant="caption">
                Teacher
              </Typography>
            </Grid>
            {classesAsTeacher.map((item) => (
              <Class item={item} key={item.id} />
            ))}
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
            <Grid item>
              <Typography className="text-warning" variant="caption">
                Student
              </Typography>
            </Grid>
            {classesAsStudent.map((item) => (
              <Class item={item} key={item.id} />
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default Home;
