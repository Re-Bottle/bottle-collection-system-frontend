import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg text-success bg-light">
                <div className="container">
                    <a className="navbar-brand" style={{
                        cursor: 'pointer',
                    }} onClick={() => { navigate('/') }}>
                        {/* <img src={image} alt="logo" className="d-inline-block align-text-top" /> */}
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
                            <Link to="/login">
                                <button className="btn btn-primary me-2">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-secondary">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}