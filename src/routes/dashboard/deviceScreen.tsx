import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Device } from "../../types/user";

export default function DeviceScreen() {
  const { state } = useLocation();
  const device: Device = state.device;
  const navigate = useNavigate();

  return (
    <section
      id="device"
      className="bg-light container-fluid  py-5  d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Button
        className="btn btn-success position-absolute top-0 start-0 m-3"
        onClick={() => navigate("/dashboard")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left text-light"></i>
      </Button>
      <div className="container flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-success">Edit</button>
        </div>

        {device ? (
          <div className="row align-items-center">
            <h1 className="text-success fs-1"> {device.deviceName}</h1>
            <h2> {device.deviceId}</h2>
            <p>{device.deviceLocation}</p>
            <p>{device.deviceDescription}</p>
            <p>Fill Level: {device.deviceFillLevel}%</p>
            <p>Status: {device.deviceActiveStatus ? "Active" : "Inactive"}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
