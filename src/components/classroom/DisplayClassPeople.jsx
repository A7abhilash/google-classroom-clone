import { Divider, Grid } from "@material-ui/core";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function DisplayClassPeople({ people }) {
  const { currentUser } = useAuth();

  return (
    <Grid container className="my-3">
      {people?.map((item, index) => (
        <Grid item lg={12} xs={12} key={item.email + index}>
          <div className="d-flex align-items-center py-2">
            <div className="py-2 px-3">
              <p className="text-light">
                <i
                  className="fas fa-user fa-lg"
                  style={{ marginRight: 10 }}
                ></i>
                {item.email}
                {item.email === currentUser.email && (
                  <span className="ml-1 text-muted">(You)</span>
                )}
              </p>
            </div>
          </div>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

export default DisplayClassPeople;
