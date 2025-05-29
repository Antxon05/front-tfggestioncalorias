import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routing/privateRoute";
import CreateProfile from "./pages/CreateProfile";
import TargetCalories from "./pages/TargetCalories";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute requireToken={true}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute requireToken={true}>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/register/create-profile"
            element={
              <PrivateRoute requireToken={false} requirePartialRegistry={true}>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/register/create-profile/target-calories"
            element={
              <PrivateRoute
                requireToken={false}
                requirePartialRegistry={false}
                requireRegistryCompleted={true}
              >
                <TargetCalories />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
