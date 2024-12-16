import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAuth } from '../../context/AuthContext';
import { emailValidation, passwordValidation } from '../../util/validation';
import image from "../../assets/images/sign-in.png"


export default function Login(token: any) {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { login, isAuthenticated } = useAuth();
    const [open, setOpen] = useState<boolean>(false);
    const [dialogMessage, setDialogMessage] = useState<string>('');
    const [dialogTitle, setDialogTitle] = useState<string>('');

    const handleOpen = (message: string, title: string) => {
        setDialogMessage(message);
        setDialogTitle(title);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


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
            fetch('http://localhost:3000/auth/loginVendor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {

                        login({
                            email: data.email, id: data.id, name: data.name
                        });
                    } else {
                        handleOpen(data.message, "Login Error");
                    }
                })
                .catch(error => {
                    console.error('Error during fetch:', error);
                    handleOpen(error.toString(), "Network Error");
                });
        }
    }

    useEffect(() => {
        if (accountCreated) {
            handleOpen("Account Created successfully! login to continue.", "Account Created")
            // setShowLoginDialog(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        width: 400,  // Set the width to 400px (adjust as needed)
                        maxWidth: 'none',  // Ensure it doesn't stretch wider than the width you set
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMessage} </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>

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
                            {error && <div className="alert alert-danger">{error}</div>}
                        </div>
                        <div className="d-flex justify-content-center text-light">
                            <p onClick={() => navigate("/register")} style={{ cursor: 'pointer' }}>Don't have an account? Sign up</p>
                        </div>

                    </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={image} alt="loading" className="img rounded" />
                </div>
            </div>
        </>
    );
}