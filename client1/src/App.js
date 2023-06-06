import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SkillAssesment from "./Pages/SkillAssesment"
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Templates from "./Pages/templates";
import React, { useState } from 'react';

import React, { lazy, Suspense } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Home = lazy(() => import("./Pages/Home"));
const Profile = lazy(() => import("./Pages/Profile"));
const Templates = lazy(() => import("./Pages/templates"));


function App() {
 
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/templates/:id"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/assessSkills"
            element={
              <ProtectedRoute>
                < SkillAssesment/>
              </ProtectedRoute>
            }
          />
        </Routes>

        <Suspense fallback={<Spin size="large" />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templates/:id"
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
          </Routes>
        </Suspense>

      </BrowserRouter>
    
      </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  if (localStorage.getItem("tusharresume-users")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
