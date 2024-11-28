import { useNavigate } from "react-router-dom";

export default function DeviceScreen() {
    const navigate = useNavigate();

    return (

        <section
            id="device"
            className="bg-light container-fluid  py-5  d-flex flex-column align-items-center"
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
                    <h1 className="text-success">Device_Name</h1>
                    <button className="btn btn-success">Edit</button>
                </div>
                <div className=" card bg-success shadow-lg p-4 flex-grow-1">
                    <div className="row align-items-center">
                        {

                        }

                    </div>
                </div>
            </div>
        </section>

    )
}