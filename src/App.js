import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoute from "./routes/AppRoute";
import Navbar from "./containers/Navbar";
import { MsgProvider } from "./contexts/MsgContext";
import CustomSnackBar from "./containers/CustomSnackBar";
import { ClassroomProvider } from "./contexts/ClassroomContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MsgProvider>
          <ClassroomProvider>
            <Navbar />
            <div style={{ backgroundColor: "#121212", minHeight: "92vh" }}>
              <AppRoute />
            </div>
            <CustomSnackBar />
          </ClassroomProvider>
        </MsgProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
