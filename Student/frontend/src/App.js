import "./App.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CourseRegistrationPage from "./pages/CourseRegistrationPage";
const time = ["8", "9", "10", "11", "12"];
const App = () => {
  // console.log("mc");
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path=" /" element={<HomePage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/courseRegister"
            element={<CourseRegistrationPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
