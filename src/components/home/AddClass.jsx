import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";

function AddClass() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
      }}
    >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="mb-2 bg-warning shadow-lg"
        variant="contained"
        style={{
          borderRadius: "50%",
          height: 60,
          width: 50,
        }}
      >
        <i className="fas fa-plus fa-lg text-dark"></i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/create-class" className="text-decoration-none text-dark">
            Create Class
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/join-class" className="text-decoration-none text-dark">
            Join Class
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AddClass;
