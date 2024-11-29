import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const data: Device[] = [
    { id: 1, name: "Bin 1", location: "Kathmandu", fillLevel: 80, status: "Active" },
    { id: 2, name: "Bin 2", location: "Lalitpur", fillLevel: 50, status: "Active" },
    { id: 3, name: "Bin 3", location: "Bhaktapur", fillLevel: 70, status: "Inactive" },
    { id: 4, name: "Bin 4", location: "Pokhara", fillLevel: 90, status: "Active" },
    { id: 5, name: "Bin 5", location: "Chitwan", fillLevel: 30, status: "Active" },
    { id: 6, name: "Bin 6", location: "Butwal", fillLevel: 60, status: "Inactive" },
    { id: 7, name: "Bin 7", location: "Dharan", fillLevel: 40, status: "Active" },
    { id: 8, name: "Bin 8", location: "Biratnagar", fillLevel: 70, status: "Active" },
    { id: 9, name: "Bin 9", location: "Hetauda", fillLevel: 50, status: "Inactive" },
    { id: 10, name: "Bin 10", location: "Dhangadi", fillLevel: 80, status: "Active" },
];

type Device = {
    id: number;
    name: string;
    location: string;
    fillLevel: number;
    status: string;
};



export default function Devices() {
    const [deviceID, setDeviceID] = useState<string>('');
    const [deviceName, setDeviceName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddDeviceSubmit = () => {

    }

    return (
        <section
            id="devices"
            className="bg-light container-fluid py-5 d-flex flex-column align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <button
                className="btn btn-success position-absolute top-0 start-0 m-3"
                onClick={() => navigate('/')}
                style={{ zIndex: 10 }}
            >
                <i className="bi bi-arrow-left text-light"></i>
            </button>
            <div className="container flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-between mb-4">
                    <h1 className="text-success">Devices</h1>
                    <Button variant="outlined" color="success" size="large" onClick={handleClickOpen}>
                        Add Device +
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries((formData as any).entries());
                                const email = formJson.email;
                                console.log(email);
                                handleClose();
                            },
                        }}
                    >
                        <DialogTitle align="center" color="success">Add device</DialogTitle>
                        <DialogContent>
                            <DialogContentText align="center">
                                Add the details about the device to connect.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id={deviceID}
                                name={deviceID}
                                label="Device ID"
                                type="email"
                                fullWidth
                                variant="standard"
                                color="success"
                            />
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="string"
                                label="Device Name"
                                type="email"
                                fullWidth
                                variant="standard"
                                color="success"
                            />
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="string"
                                label="Location"
                                type="email"
                                fullWidth
                                variant="standard"
                                color="success"
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                name="string"
                                label="Description"
                                type="email"
                                fullWidth
                                variant="standard"
                                color="success"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button color="success" onClick={handleClose}>Cancel</Button>
                            <Button color="success" onClick={handleAddDeviceSubmit} type="submit" variant="contained">Add</Button>
                        </DialogActions>
                    </Dialog>

                </div>
                <div className="card bg-success shadow-lg p-4 flex-grow-1">
                    <div className="row align-items-center">
                        {data.map((device) => (
                            <div className="col-md-4 mb-3" key={device.id}>
                                <div className="card p-3 hoverable_card">
                                    <h3 className="text-success">{device.name}</h3>
                                    <p>Location: {device.location}</p>
                                    <p>Fill Level: {device.fillLevel}</p>
                                    <p>Status: {device.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </section>
    );
}
