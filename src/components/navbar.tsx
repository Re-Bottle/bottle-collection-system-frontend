import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

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
                <button
                  className="nav-link btn"
                  onClick={() => scrollToSection("about")}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => scrollToSection("appDownload")}
                >
                  Download App
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact Us
                </button>
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
