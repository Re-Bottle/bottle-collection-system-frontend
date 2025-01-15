import { useNavigate, useLocation } from "react-router-dom";
import { Button, Divider, LinearProgress, Stack } from "@mui/material";
import { Device } from "../../types/user";

export default function DeviceScreen() {
  const { state } = useLocation();
  const device: Device = state.device;
  const navigate = useNavigate();

  return (
    <section
      id="device"
      className="bg-light container-fluid py-5 d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <button
        className="btn btn-success position-absolute top-0 start-0 m-3"
        onClick={() => navigate("/dashboard")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left text-light"></i>
      </button>
      <div className="container flex-grow-1 d-flex flex-column">
        {device ? (
          <>
            <div className="row align-items-center mb-3">
              <h1 className="text-success fs-1">{device.deviceName}</h1>
              <div className="d-flex align-items-center">
                <h2> {device.id}</h2>
                <div
                  className={`badge ${
                    device.deviceActiveStatus ? "bg-success" : "bg-danger"
                  } p-2 ms-5 text-white`}
                >
                  {device.deviceActiveStatus ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
            <div>
              <p>
                <b style={{ fontWeight: "bold" }}>Location:</b>{" "}
                {device.deviceLocation}
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Description:</b>{" "}
                {device.deviceDescription}
              </p>
              {/* Fill Level as Progress Bar */}
              <div>
                <b>Fill Level:</b> {device.deviceFillLevel}%
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <Divider className="my-4" />

        <div className="d-flex justify-content-between gap-2 w-100">
          <Button
            variant="contained"
            color="success"
            onClick={() => console.log("Edit device")}
          >
            <i className="bi bi-pencil me-3"></i>
            Edit Device
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => console.log("Delete device")}
          >
            <i className="bi bi-trash me-3"></i>
            Delete Device
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={() => console.log("Disable device")}
          >
            <i className="bi bi-x-circle me-3"></i>
            Disable Device
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => console.log("Report issue")}
          >
            <i className="bi bi-exclamation-triangle me-3"></i>
            Report Issue
          </Button>
        </div>
      </div>
    </section>
  );
}
