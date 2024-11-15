import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/Sign In.png"


export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const onSubmit = () => {

    }

    return (
        <>
            <div className="d-flex flex-column-reverse flex-md-row" style={{ minHeight: '100vh' }}>
                <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                    <div className="card bg-success rounded-6 shadow-lg w-100">
                        <h1 className="lead text-center text-light m-3 card-title">Login</h1>
                        <form className="px-4 py-3" >

                            <div className="form-group">
                                <label htmlFor="email" className="text-light">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-light">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Create a password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-light text-success btn-block m-4" onClick={onSubmit}>Login</button>
                        </div>
                        <div className="d-flex justify-content-center text-light">
                            <p onClick={() => navigate("/register")} style={{ cursor: 'pointer' }}>Don't have an account? Sign up</p>
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
