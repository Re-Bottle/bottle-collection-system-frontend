import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/Sign Up.png";

export default function Register() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit = () => {
        // Handle the form submission
    }

    return (
        <>
            {/* Back Button */}
            <button
                className="btn btn-light position-absolute top-0 start-0 m-3"
                onClick={() => navigate('/')}
                style={{ zIndex: 10 }}
            >
                <i className="bi bi-arrow-left text-success"></i>
            </button>

            <div className="d-flex flex-column-reverse flex-md-row" style={{ minHeight: '100vh' }}>
                <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                    <div className="card bg-success rounded-6 shadow-lg w-100">
                        <h1 className="lead text-center text-light m-3 card-title">Register</h1>
                        <form className="px-4 py-3">
                            <div className="form-group">
                                <label htmlFor="firstName" className="text-light">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="text-light">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="text-light">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-light">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="text-light">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    required
                                />
                            </div>
                        </form>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-light text-success btn-block m-4" onClick={onSubmit}>Sign Up</button>
                        </div>
                        <div className="d-flex justify-content-center text-light">
                            <p onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Have an account? Login</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={image} alt="loading image" className="img rounded" />
                </div>
            </div>
        </>
    );
}
