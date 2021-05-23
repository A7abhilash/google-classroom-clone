import React from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";

function Profile() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <CenteredContainer>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header text-center">
          <h2>Profile</h2>
        </div>
        <div className="card-body">
          <p className="lead">
            <strong>Email:</strong> {currentUser && currentUser.email}
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="btn btn-secondary btn-sm">
              Back
            </Link>
            <Link to="/updateProfile" className="btn btn-primary btn-sm">
              Update Profile
            </Link>
          </div>
        </div>
        <div className="card-footer">
          <button onClick={handleLogout} className="btn btn-sm btn-danger">
            Sign out
          </button>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Profile;
