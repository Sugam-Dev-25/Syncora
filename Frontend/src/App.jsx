import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import Requests from "./components/Requests";

import Navbar from "./components/Navbar";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getMe } from "./features/auth/authSlice";

function App() {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (

    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* PROTECTED ROUTES */}

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <div className="h-screen flex flex-col">

              <Navbar />

              <Dashboard />

            </div>

          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>

            <div className="min-h-screen flex flex-col">

              <Navbar />

              <Profile />

            </div>

          </ProtectedRoute>
        }
      />

      <Route
        path="/friend-requests"
        element={
          <ProtectedRoute>

            <div className="min-h-screen flex flex-col">

              <Navbar />

              <Requests />

            </div>

          </ProtectedRoute>
        }
      />

    </Routes>

  );

}

export default App;