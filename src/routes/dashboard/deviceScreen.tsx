import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { Button } from '@mui/material';
import { Device } from "../../types/user";


export default function DeviceScreen() {
    const { user } = useAuth();
    const { deviceId } = useParams(); // Get deviceId from the URL
    const navigate = useNavigate();
    const [device, setDevice] = useState<Device>();

    useEffect(() => {
        // Fetch device details using deviceId
        fetch(`http://localhost:3000/device/getDeviceDetails/${deviceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vendorId: user?.id
            }),
            credentials: 'include', // To send cookies with the request (if needed)
        })
            .then((response) => {
                console.log("Response: ", response);
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then((data) => {
                const device = data.device
                setDevice(
                    device
                )
                console.log("Device: ", device);
            })
            .catch((error) => console.error('Error fetching device details:', error));
    }, [deviceId]);

    return (
        <section
            id="device"
            className="bg-light container-fluid  py-5  d-flex flex-column align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Button
                className="btn btn-success position-absolute top-0 start-0 m-3"
                onClick={() => navigate('/dashboard')}
                style={{ zIndex: 10 }}
            >
                <i className="bi bi-arrow-left text-light"></i>
            </Button>
            <div className="container flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-between mb-4">
                    <Button className="btn btn-success">Edit</Button>
                </div>

                {device ? (
                    <div className="row align-items-center">
                        <h1 className='text-success fs-1'> {device.deviceName}</h1>
                        <h2> {deviceId}</h2>
                        <p>{device.deviceLocation}</p>
                        <p>{device.deviceDescription}</p>
                        <p>Fill Level: {device.deviceFillLevel}%</p>
                        <p>Status: {device.deviceActiveStatus ? 'Active' : 'Inactive'}</p>
                    </div>
                ) : (<p>Loading...</p>)

                }

            </div>

        </section >

    )
}