import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoute from "./routes/AppRoute";
import Navbar from "./containers/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div style={{ backgroundColor: "#121212", minHeight: "92vh" }}>
          <AppRoute />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
