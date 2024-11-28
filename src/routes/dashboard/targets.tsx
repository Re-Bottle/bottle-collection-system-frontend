import { useNavigate } from "react-router-dom";

const data: Target[] = [
    {
        id: 1,
        name: "Bin 1",
        location: "Kathmandu",
        fillLevel: 80,
        status: "Active",
    },
    {
        id: 2,
        name: "Bin 2",
        location: "Lalitpur",
        fillLevel: 50,
        status: "Active",
    },
    {
        id: 3,
        name: "Bin 3",
        location: "Bhaktapur",
        fillLevel: 70,
        status: "Inactive",
    },
    {
        id: 4,
        name: "Bin 4",
        location: "Pokhara",
        fillLevel: 90,
        status: "Active",
    },
    {
        id: 5,
        name: "Bin 5",
        location: "Chitwan",
        fillLevel: 30,
        status: "Active",
    },
    {
        id: 6,
        name: "Bin 6",
        location: "Butwal",
        fillLevel: 60,
        status: "Inactive",

    },
    {
        id: 7,
        name: "Bin 7",
        location: "Dharan",
        fillLevel: 40,
        status: "Active",

    },
    {
        id: 8,
        name: "Bin 8",
        location: "Biratnagar",
        fillLevel: 70,
        status: "Active",

    },
    {
        id: 9,
        name: "Bin 9",
        location: "Hetauda",
        fillLevel: 50,
        status: "Inactive",

    },
    {
        id: 10,
        name: "Bin 10",
        location: "Dhangadi",
        fillLevel: 80,
        status: "Active",

    },
]
type Target = {
    id: number;
    name: string;
    location: string;
    fillLevel: number;
    status: string;
}

export default function Targets() {
    const navigate = useNavigate();

    return (<div className="bg-light">

        <section
            id="devices"
            className="container-fluid  py-5  d-flex flex-column align-items-center"
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
                    <h1 className="text-success">Targets</h1>
                    <button className="btn btn-success">Add Target +</button>
                </div>
                <div className=" card bg-success shadow-lg p-4 flex-grow-1">
                    <div className="row align-items-center">
                        {
                            data.map((target) => (
                                <div className="col-md-4 mb-3" key={target.id}>
                                    <div className="card p-3 hoverable_card">
                                        <h3 className="text-success">{target.name}</h3>
                                        <p>Location: {target.location}</p>
                                        <p>Fill Level: {target.fillLevel}</p>
                                        <p>Status: {target.status}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </section>
    </div>);

}