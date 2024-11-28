import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-lg text-success bg-light">
                <div className="container">
                    <a className="navbar-brand h1" style={{
                        cursor: 'pointer',
                    }} onClick={() => { navigate('/') }}>
                        Re-Bottle
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto" >
                            <li className="nav-item">
                                <a className="nav-link" style={{
                                    cursor: 'pointer',
                                }} aria-current="page" onClick={() => { navigate('/#about') }}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{
                                    cursor: 'pointer',
                                }} onClick={() => { navigate('/#appDownload') }}>Download app</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " style={{
                                    cursor: 'pointer',
                                }} onClick={() => { navigate('/#contact') }}>Contact us</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Link className="btn btn-success me-2" to={isAuthenticated ? '/dashboard' : '/login'}>
                                {
                                    isAuthenticated ? 'Dashboard' : 'Login'
                                }
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}