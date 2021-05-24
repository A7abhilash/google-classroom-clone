import { Grid } from "@material-ui/core";
import React from "react";

function SidebarOptions({ selectedOption, handleSelection }) {
  const options = [
    {
      title: "Materials",
    },
    {
      title: "Assignments",
    },
    {
      title: "People",
    },
  ];

  return (
    <Grid container alignItems="center" spacing={3}>
      {options.map((option) =>
        option.title === selectedOption ? (
          <Grid
            item
            lg={12}
            xs={4}
            key={option.title}
            style={{
              backgroundColor: "#F7CD2E",
              borderRadius: 5,
              paddingBottom: 5,
            }}
          >
            <div>
              <h6>{option.title}</h6>
            </div>
          </Grid>
        ) : (
          <Grid item lg={12} xs={4} key={option.title}>
            <div
              onClick={() => handleSelection(option.title)}
              style={{ cursor: "pointer" }}
            >
              <h6 className="text-light">{option.title}</h6>
            </div>
          </Grid>
        )
      )}
    </Grid>
  );
}

export default SidebarOptions;
