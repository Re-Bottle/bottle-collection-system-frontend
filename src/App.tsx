import { Route, Routes } from "react-router-dom";
import "./responsive.css";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./routes/home/home";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import Dashboard from "./routes/dashboard/dashboard";
import Devices from "./routes/dashboard/devices";
import Rewards from "./routes/dashboard/rewards";
import DeviceScreen from "./routes/dashboard/deviceScreen";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Devices />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="notifications" element={<Dashboard />} />
          <Route path="device/:deviceId" element={<DeviceScreen />} />
        </Route>
        {/* <Route path='*' exact={true} component={My404Component} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
