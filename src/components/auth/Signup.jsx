import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CenteredContainer>
      <div className="card w-100" style={{ maxWidth: "400px" }}>
        <div className="card-header text-center">
          <h2>Sign Up</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                ref={emailRef}
                className="form-control mb-2"
                placeholder="Enter new email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                ref={passwordRef}
                className="form-control mb-2"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                className="form-control mb-2"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form-group">
              <button disabled={loading} className="btn btn-primary btn-sm">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center pb-1">
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default Signup;
