import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Franchise from "./pages/Franchise/Franchise";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/franchise'
          element={<Franchise />}
        />
      </Routes>
    </Router>
  );
};

export default App;
