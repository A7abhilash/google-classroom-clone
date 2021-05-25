import React from "react";
import { Redirect, Switch } from "react-router-dom";
import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import Profile from "../components/auth/Profile";
import Signup from "../components/auth/Signup";
import UpdateProfile from "../components/auth/UpdateProfile";
import Classroom from "../components/classroom/Classroom";
import Material from "../components/classroom/Material";
import PostToClass from "../components/classroom/PostToClass";
import CreateClass from "../components/home/CreateClass";
import Home from "../components/home/Home";
import JoinClass from "../components/home/JoinClass";
import { useAuth } from "../contexts/AuthContext";
import AuthRoute from "./AuthRoute";
import GuestRoute from "./GuestRoute";

function AppRoute() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <Switch>
        {/* Classroom */}
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute exact path="/create-class" component={CreateClass} />
        <AuthRoute exact path="/join-class" component={JoinClass} />
        <AuthRoute exact path="/classroom/:classId" component={Classroom} />
        <AuthRoute
          exact
          path="/classroom/:classId/material/:materialId"
          component={Material}
        />
        <AuthRoute
          exact
          path="/classroom/:classId/post"
          component={PostToClass}
        />
        <AuthRoute
          exact
          path="/classroom/:classId/material/:materialId"
          component={Classroom}
        />

        {/* User profile */}
        <AuthRoute path="/profile" component={Profile} />
        <AuthRoute path="/updateProfile" component={UpdateProfile} />

        {/* Authentication */}
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/signup" component={Signup} />
        <GuestRoute path="/forgotPassword" component={ForgotPassword} />

        {/* Redirect */}
        {currentUser ? (
          <Redirect from="*" to="/login" />
        ) : (
          <Redirect from="*" to="/" />
        )}
      </Switch>
    </div>
  );
}

export default AppRoute;
