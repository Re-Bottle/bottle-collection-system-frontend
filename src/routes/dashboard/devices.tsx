import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder_image from "../../assets/images/404-not-found.svg";
import { useAuth } from "../../context/AuthContext";
import { Device } from "../../types/user";

// const data: Device[] = [
//     { id: "11", name: "Bin 1", location: "Kathmandu", fillLevel: 80, status: "Active", description: "This is a smart bin" },
//     { id: "20", name: "Bin 2", location: "Lalitpur", fillLevel: 50, status: "Active", description: "" },
//     { id: "30", name: "Bin 3", location: "Bhaktapur", fillLevel: 70, status: "Inactive", description: "" },
//     { id: "40", name: "Bin 4", location: "Pokhara", fillLevel: 90, status: "Active", description: "" },
//     { id: "50", name: "Bin 5", location: "Chitwan", fillLevel: 30, status: "Inactive", description: "" },
//     { id: "60", name: "Bin 6", location: "Butwal", fillLevel: 60, status: "Inactive", description: "" },
//     { id: "70", name: "Bin 7", location: "Dharan", fillLevel: 40, status: "Inactive", description: "" },
//     { id: "80", name: "Bin 8", location: "Biratnagar", fillLevel: 70, status: "Active", description: "This is a smart bin that is located at the Biratnagar area" },
//     { id: "90", name: "Bin 9", location: "Hetauda", fillLevel: 50, status: "Inactive", description: "" },
//     { id: "10", name: "Bin 10", location: "Dhangadi", fillLevel: 80, status: "Active", description: "" },
// ];

/**
export interface Device {
  deviceId: string;
  deviceName: string | null;
  userId: string | null;
  deviceLocation: string | null;
  deviceFillLevel: number;
  deviceDescription: string | null;
  claimableStatus: boolean;
  lastActionTimestamp: Date;
  deviceActiveStatus: boolean;
}
 */

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  const [deviceId, setDeviceID] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("");
  const [deviceDescription, setDescription] = useState<string>("");
  const [openAddDeviceDialog, setOpenAddDeviceDialog] =
    useState<boolean>(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);
  const [openFailureDialog, setOpenFailureDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClickOpenAddDeviceDialog = () => setOpenAddDeviceDialog(true);
  const handleCloseAddDeviceDialog = () => setOpenAddDeviceDialog(false);

  const handleOpenSuccessDialog = () => setOpenSuccessDialog(true);
  const handleCloseSuccessDialog = () => setOpenSuccessDialog(false);

  const handleOpenFailureDialog = () => setOpenFailureDialog(true);
  const handleCloseFailureDialog = () => setOpenFailureDialog(false);

  const handleAddDeviceSubmit = () => {
    fetch("http://localhost:3000/device/claimDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: user?.id,
        id: deviceId,
        deviceName: deviceName,
        deviceLocation: deviceLocation,
        deviceDescription: deviceDescription,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          handleOpenSuccessDialog();
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        setDevices([
          ...devices,
          {
            deviceId,
            deviceName,
            deviceLocation,
            deviceFillLevel: 0,
            deviceActiveStatus: true,
            deviceDescription,
            vendorId: user?.id!!,
            claimableStatus: false,
            lastActionTimestamp: new Date(),
          },
        ]);
      })
      .catch((error) => {
        handleOpenFailureDialog();
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/device/getDevices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorId: user?.id,
      }),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        setDevices(data.devices);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <section
      id="devices"
      className="bg-light container-fluid py-5 d-flex flex-column align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <button
        className="btn btn-success position-absolute top-0 start-0 m-3"
        onClick={() => navigate("/")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left text-light"></i>
      </button>
      <div className="container flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between mb-4">
          <h1 className="text-success">Devices</h1>
          <Button
            variant="outlined"
            color="success"
            size="large"
            onClick={handleClickOpenAddDeviceDialog}
          >
            Add Device +
          </Button>
          <Dialog
            open={openAddDeviceDialog}
            onClose={handleCloseAddDeviceDialog}
            PaperProps={{
              component: "form",
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                handleCloseAddDeviceDialog();
              },
            }}
          >
            <DialogTitle align="center" color="success">
              Add device
            </DialogTitle>
            <DialogContent>
              <DialogContentText align="center">
                Add the details about the device to connect.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="deviceID"
                label="Device ID"
                type="text"
                fullWidth
                variant="standard"
                color="success"
                value={deviceId}
                onChange={(e) => setDeviceID(e.target.value)}
              />
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
              <Button color="success" onClick={handleCloseAddDeviceDialog}>
                Cancel
              </Button>
              <Button
                color="success"
                onClick={handleAddDeviceSubmit}
                type="submit"
                variant="contained"
              >
                Add
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
            <DialogTitle id="alert-dialog-title">
              {"Device Claimed Successfully"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The device has been claimed successfully. You can now view the
                device in the devices section.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSuccessDialog} autoFocus>
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
                There was an error claiming the device. Please try again later.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseFailureDialog} autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="card bg-success shadow-lg p-4 flex-grow-1">
          <div className="row align-items-center">
            {devices.length === 0 ? (
              <div className="text-center text-light">
                <h2>No devices found</h2>
                <p>Click on the "Add Device" button to add a new device.</p>
                <img
                  src={placeholder_image}
                  alt="no devices found"
                  style={{ height: 300 }}
                />
              </div>
            ) : (
              devices.map((device) =>
                device.deviceActiveStatus ? (
                  <div
                    className="col-12 col-md-6 col-lg-4 mb-4"
                    key={device.deviceId}
                  >
                    <div className="card bg-light  shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-success">
                          {device.deviceName}
                        </h5>
                        <p className="card-text text-secondary">
                          {device.deviceLocation}
                        </p>
                        <p className="card-text text-secondary">
                          Fill Level: {device.deviceFillLevel}%
                        </p>
                        <p className="card-text text-secondary">
                          {device.deviceDescription}
                        </p>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            navigate(`/dashboard/device/${device.deviceId}`, {
                              state: { device },
                            });
                          }} // Navigate to device details page
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="col-12 col-md-6 col-lg-4 mb-4"
                    key={device.deviceId}
                  >
                    <div className="card bg-dark bg-gradient shadow-sm ">
                      <div className="card-body">
                        <h5 className="card-title text-danger">
                          {device.deviceName}
                        </h5>
                        <p className="card-text text-light">
                          {device.deviceLocation}
                        </p>
                        <p className="card-text text-light">
                          Fill Level: {device.deviceFillLevel}%
                        </p>
                        <p className="card-text text-light ">
                          {device.deviceDescription}
                        </p>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            navigate(`/dashboard/device/${device.deviceId}`, {
                              state: { device },
                            });
                          }} // Navigate to device details page
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
