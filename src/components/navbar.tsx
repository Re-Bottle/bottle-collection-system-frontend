import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg text-success bg-light">
        <div className="container">
          <Link className="navbar-brand h1" to={"/"}>
            Re-Bottle
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/#about"}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#appDownload"}>
                  Download app
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#contact"}>
                  Contact us
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link
                className="btn btn-success me-2"
                to={isAuthenticated ? "/dashboard" : "/login"}
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
