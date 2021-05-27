import React from "react";
import { Grid } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";

function DisplayClassPeople({ people, teacher }) {
  const { currentUser } = useAuth();

  return (
    <Grid container className="my-3">
      <Grid item lg={12} xs={12}>
        <p className="text-warning mb-0 mt-1">Teacher</p>
        <div className="d-flex align-items-center py-2 px-3">
          <p className="text-info">
            <i
              className="fas fa-chalkboard-teacher fa-lg"
              style={{ marginRight: 10 }}
            ></i>
            {teacher}
            {teacher === currentUser.email && (
              <span className="text-muted" style={{ marginLeft: 5 }}>
                (You)
              </span>
            )}
          </p>
        </div>
        <p className="text-warning mb-0 mt-1">Students ({people.length})</p>
      </Grid>
      {people?.map((person, index) => (
        <Grid item lg={12} xs={12} key={person + index}>
          <div
            className={`d-flex align-items-center pt-2 px-3 ${
              index !== people.length - 1
                ? "border-bottom border-secondary"
                : ""
            }`}
          >
            <p className="text-light">
              <i className="fas fa-user fa-lg" style={{ marginRight: 10 }}></i>
              {person}
              {person === currentUser.email && (
                <span className="text-muted" style={{ marginLeft: 5 }}>
                  (You)
                </span>
              )}
            </p>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default DisplayClassPeople;
