import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import image from "../../assets/images/sign-in.png"
import { useAuth } from '../../context/AuthContext';
import { emailValidation, passwordValidation } from '../../util/validation';


export default function Login(token: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const { login, isAuthenticated } = useAuth();

    // const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false)
    const accountCreated = useLocation()?.state?.account_created

    // Helper function to validate the form
    const validateForm = () => {
        // Reset errors first
        setError('');

        const emailValidationResult = emailValidation(email)
        // Check email format
        if (!emailValidationResult.result) {
            setError(emailValidationResult.message);
            return false;
        }

        const passwordValidationResult = passwordValidation(password)
        // Password validation: Check length, case, digit, and special character
        if (!passwordValidationResult.result) {
            setError(passwordValidationResult.message);
            return false;
        }

        return true;
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        login({
                            email: data.email, id: data.id
                        });
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error during fetch:', error);
                    alert(error);
                });
        }
    }

    useEffect(() => {

        if (accountCreated) {
            alert("Account Created successfully! login to continue.")
            // setShowLoginDialog(true)
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated])

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