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

const LoadingIndicator = () => (
    <div className="loading-indicator">
        <span>Loading...</span>
    </div>
);

export default function Devices() {
    const [location, setLocation] = useState<string>('');
    const [binCode, setBinCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAddDeviceSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Start loading
        setIsLoading(true);
        setIsSuccess(false);

        // Simulate a delay for loading (like an API call or processing)
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true); // Simulate success
        }, 3000); // 3 seconds delay
    };

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
                    <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target="#addDeviceModal"
                    >
                        Add Device +
                    </button>
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

            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                id="addDeviceModal"
                tabIndex={-1}
                aria-labelledby="addDeviceModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addDeviceModalLabel">
                                Enter Location and Bin Code
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddDeviceSubmit}>
                                <div>
                                    <label>Location:</label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Bin Code:</label>
                                    <input
                                        type="text"
                                        value={binCode}
                                        onChange={(e) => setBinCode(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    Submit
                                </button>
                            </form>

                            {isLoading && <LoadingIndicator />} {/* Show loading indicator when loading */}
                            {isSuccess && !isLoading && (
                                <div className="success-message mt-3">
                                    Device found!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
