import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CenteredContainer from "../../containers/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
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
          <h2>Password Reset</h2>
        </div>
        <div className="card-body">
          {message ? (
            <p className="text-success lead">{message}</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  ref={emailRef}
                  className="form-control mb-2"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button disabled={loading} className="btn btn-primary btn-sm">
                Reset Password
              </button>
            </form>
          )}
        </div>
        <div className="card-footer text-center pb-1">
          <h6>
            <Link to="/login">Login</Link>
          </h6>
        </div>
      </div>
    </CenteredContainer>
  );
}

export default ForgotPassword;
