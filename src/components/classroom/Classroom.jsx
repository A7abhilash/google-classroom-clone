import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import { Container, Grid } from "@material-ui/core";
import Loading from "../../containers/Loading";
import useClass from "./../../hooks/useClass";
import SelectOptions from "./SelectOptions";
import { useAuth } from "../../contexts/AuthContext";
import DisplayClassPosts from "./DisplayClassPosts";
import DisplayClassPeople from "./DisplayClassPeople";
import Header from "./Header";
import PendingWork from "./PendingWork";

function Classroom() {
  const { currentUser } = useAuth();
  const { classId } = useParams();
  const { error, currentClass, materials, assignments, isTeacher } =
    useClass(classId);
  const [selectedOption, setSelectedOption] = useState("Assignments");

  const switchContent = () => {
    switch (selectedOption) {
      case "Assignments":
        return (
          <DisplayClassPosts
            items={assignments}
            type="assignment"
            classLink={`/classroom/${classId}`}
            isTeacher={isTeacher}
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

  const getPendingWork = () => {
    if (assignments) {
      // return assignments.filter((item) =>
      //   item.submissions.filter((i) => i.email !== currentUser.email)
      // );
      let list = [];
      assignments.forEach((assignment) => {
        let flag = 1;
        for (const submission of assignment.submissions) {
          if (submission.email === currentUser.email) {
            flag = 0;
            break;
          }
        }
        flag && list.push(assignment);
      });
      return list;
    }
  };

  if (error) {
    return <Redirect to="/" />;
  }

  return currentClass !== null ? (
    <Container maxWidth="md">
      {currentClass && (
        <Header currentClass={currentClass} isTeacher={isTeacher} />
      )}
      <Grid container alignItems="flex-start" className="mt-4">
        {currentClass && !isTeacher && (
          <PendingWork assignments={getPendingWork()} classId={classId} />
        )}
        <Grid item lg={8} md={8} xs={12} className="mx-auto mt-3 mt-md-0">
          <SelectOptions
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          {materials && switchContent()}
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Loading />
  );
}

export default Classroom;
