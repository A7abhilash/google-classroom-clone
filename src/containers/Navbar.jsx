import React from "react";
import { Link } from "react-router-dom";
import AddClass from "../components/home/AddClass";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div className="navbar bg-gray align-items-center justify-content-between py-2">
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
