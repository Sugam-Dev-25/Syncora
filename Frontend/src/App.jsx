import { Routes, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import Requests from "./Components/Requests";

import Navbar from "./Components/Navbar";

function App() {

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