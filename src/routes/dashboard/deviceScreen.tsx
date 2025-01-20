import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { Device } from "../../types/user";

export default function DeviceScreen() {
  const [openEditDeviceDialog, setOpenEditDeviceDialog] =
    useState<boolean>(false);
  const [openDeleteDeviceDialog, setOpenDeleteDeviceDialog] =
    useState<boolean>(false);

  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("");
  const [deviceDescription, setDescription] = useState<string>("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openFailureDialog, setOpenFailureDialog] = useState<boolean>(false);
  const [successTitle, setSuccessTitle] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failureMessage, setFailureMessage] = useState<string>("");

  const { state } = useLocation();
  const device: Device = state.device;
  const navigate = useNavigate();

  const handleClickOpenEditDeviceDialog = () => setOpenEditDeviceDialog(true);
  const handleCloseEditDeviceDialog = () => setOpenEditDeviceDialog(false);
  const handleClickOpenDeleteDeviceDialog = () =>
    setOpenDeleteDeviceDialog(true);
  const handleCloseDeleteDeviceDialog = () => setOpenDeleteDeviceDialog(false);

  const handleOpenSuccessDialog = () => setOpenSuccessDialog(true);
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate("/dashboard");
  };
  const handleOpenFailureDialog = () => setOpenFailureDialog(true);
  const handleCloseFailureDialog = () => setOpenFailureDialog(false);

  const handleDeleteDeviceSubmit = () => {
    fetch("http://localhost:3000/device/deleteDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: device.id }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          handleCloseDeleteDeviceDialog();
          setSuccessTitle("Success");
          setSuccessMessage("Device deleted successfully.");
          handleOpenSuccessDialog();
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch(() => {
        setFailureMessage("Failed to delete device.");
        handleOpenFailureDialog();
      });
  };

  const handleEditDeviceSubmit = () => {
    fetch("http://localhost:3000/device/editDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: device.id,
        deviceName: deviceName,
        deviceLocation: deviceLocation,
        deviceDescription: deviceDescription,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setSuccessTitle("Success");
          setSuccessMessage("Device edited successfully.");
          handleCloseEditDeviceDialog();
          handleOpenSuccessDialog();
          return response.json();
        }
        return Promise.reject(response);
      })
      .catch(() => {
        setFailureMessage("Failed to edit device.");
        handleOpenFailureDialog();
      });
  };

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
                <p className="text-success fs-5"> {device.id}</p>
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
            onClick={handleClickOpenEditDeviceDialog}
          >
            <i className="bi bi-pencil me-3"></i>
            Edit Device
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleClickOpenDeleteDeviceDialog}
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

        <Dialog
          open={openEditDeviceDialog}
          onClose={handleCloseEditDeviceDialog}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleCloseEditDeviceDialog();
            },
          }}
        >
          <DialogTitle align="center" color="success">
            Edit device
          </DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              Edit the device details.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="deviceName"
              label="Device Name"
              type="text"
              fullWidth
              variant="standard"
              color="success"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              color="success"
              value={deviceLocation}
              onChange={(e) => setDeviceLocation(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              color="success"
              value={deviceDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={handleCloseEditDeviceDialog}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={handleEditDeviceSubmit}
              type="submit"
              variant="contained"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDeleteDeviceDialog}
          onClose={handleCloseDeleteDeviceDialog}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleCloseDeleteDeviceDialog();
            },
          }}
        >
          <DialogTitle align="center" color="success">
            Delete device
          </DialogTitle>
          <DialogContent>
            <DialogContentText align="center">
              Are you sure you want to delete this device?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={handleCloseDeleteDeviceDialog}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={handleDeleteDeviceSubmit}
              type="submit"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success dialog */}
        <Dialog
          open={openSuccessDialog}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{successTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {successMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="success"
              type="submit"
              variant="contained"
              onClick={handleCloseSuccessDialog}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Failure dialog */}
        <Dialog
          open={openFailureDialog}
          onClose={handleCloseFailureDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {failureMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFailureDialog} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}
