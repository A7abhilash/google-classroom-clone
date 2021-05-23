import { Button, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div
      className="navbar bg-gray align-items-center justify-content-between"
      style={{ height: "8vh" }}
    >
      <div className="container">
        <div className="navbar-brand d-flex align-items-center">
          <img
            src={require("../icon.jpg")}
            alt="Icon"
            className="pb-2"
            style={{
              width: 30,
              marginRight: 5,
              borderRadius: 2,
            }}
          />
          <h4>
            <Link to="/" className="text-decoration-none text-white">
              Google Classroom Clone
            </Link>
          </h4>
        </div>
        {currentUser && (
          <div className="d-flex align-items-center">
            <AddClass />
            <h4 className="ml-2">
              <Link to="/profile" className="text-light">
                <i className="fas fa-user-circle fa-lg"></i>
              </Link>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

const AddClass = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className="mb-2"
      >
        <i className="fas fa-plus fa-lg text-light"></i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link to="/create-class" className="text-decoration-none text-dark">
            Create Class
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Join Class</MenuItem>
      </Menu>
    </div>
  );
};
