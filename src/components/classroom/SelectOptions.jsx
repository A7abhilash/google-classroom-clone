import { Grid } from "@material-ui/core";
import React from "react";

function SelectOptions({ selectedOption, setSelectedOption }) {
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
    <Grid container spacing={3} style={{ paddingLeft: 15, paddingRight: 15 }}>
      {options.map((option) =>
        option.title === selectedOption ? (
          <Grid item lg={4} xs={4} key={option.title}>
            <div
              style={{
                backgroundColor: "#F7CD2E",
                borderRadius: 5,
                paddingTop: 5,
                paddingBottom: 2,
              }}
              className="text-center"
            >
              <h6>{option.title}</h6>
            </div>
          </Grid>
        ) : (
          <Grid item lg={4} xs={4} key={option.title}>
            <div
              className="text-center"
              onClick={() => setSelectedOption(option.title)}
              style={{ cursor: "pointer", paddingTop: 5, paddingBottom: 3 }}
            >
              <h6 className="text-muted">{option.title}</h6>
            </div>
          </Grid>
        )
      )}
    </Grid>
  );
}

export default SelectOptions;
