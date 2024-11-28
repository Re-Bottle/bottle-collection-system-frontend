import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated])
    return (
        <div className="d-flex">
            {/* Sidebar - Make it fixed */}
            <div className="bg-success text-white shadow-lg rounded-end p-3 position-fixed d-flex flex-column"
                style={{ width: '250px', minHeight: '100vh', top: 0, left: 0 }}>
                <h3 className="text-center mb-4">Dashboard</h3>
                <div className="d-flex flex-column m-4 p-3 flex-grow-1 gap-3">
                    <div className="mb-3">
                        <Link to="/dashboard/" className="sidebar-link text-white text-decoration-none h3">
                            Devices
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/dashboard/targets" className="sidebar-link text-white text-decoration-none h3">
                            Targets
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/dashboard/notifications" className="sidebar-link text-white text-decoration-none h3">
                            Notifications
                        </Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/dashboard/account" className="sidebar-link text-white text-decoration-none h3 ">
                            Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-grow-1" style={{ paddingLeft: '250px', paddingTop: '20px' }}>
                {/* Main content will be rendered here based on the route */}
                <Outlet />
            </div>
        </div>
    );
}
