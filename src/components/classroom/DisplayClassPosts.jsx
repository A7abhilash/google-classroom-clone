import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Posts({ items, type, classLink, isTeacher }) {
  const { currentUser } = useAuth();

  const isSubmitted = (submissions) => {
    if (!isTeacher && type === "assignment") {
      if (submissions.find((i) => i.email === currentUser.email)) {
        return "text-success";
      }
      return "text-danger";
    }
    return "text-light";
  };

  return (
    <Grid container className="my-3">
      {items?.length ? (
        items.map((item) => (
          <Grid item lg={12} xs={12} key={item.id} className="mb-2">
            <Paper elevation={3} style={{ backgroundColor: "#333" }}>
              <Link
                to={`${classLink}/${type}/${item.id}`}
                className="text-decoration-none"
              >
                <div className="py-2 px-3">
                  <h5 className="text-light">
                    <i
                      className={`${
                        type === "material"
                          ? "fas fa-file-alt"
                          : "fas fa-clipboard-list"
                      } ${isSubmitted(item.submissions)}`}
                      style={{ marginRight: 10 }}
                    ></i>
                    {item.title}
                  </h5>
                </div>
              </Link>
            </Paper>
          </Grid>
        ))
      ) : (
        <h6 className="text-center text-muted">No {type}s posted</h6>
      )}
    </Grid>
  );
}

export default Posts;
