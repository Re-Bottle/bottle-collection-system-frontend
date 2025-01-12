import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/sign-up.png";
import {
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../util/validation";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");

  const handleOpen = (message: string, title: string) => {
    setDialogMessage(message);
    setDialogTitle(title);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  // Helper function to validate the form
  const validateForm = () => {
    // Reset errors first
    setError("");

    const nameValidationResult = nameValidation(firstName, lastName);
    // Check first and last name
    if (!nameValidationResult.result) {
      setError(nameValidationResult.message);
      return false;
    }

    const emailValidationResult = emailValidation(email);
    // Check email format
    if (!emailValidationResult.result) {
      setError(emailValidationResult.message);
      return false;
    }

    const passwordValidationResult = passwordValidation(password);
    // Password validation: Check length, case, digit, and special character
    if (!passwordValidationResult.result) {
      setError(passwordValidationResult.message);
      return false;
    }

    const confirmPasswordValidationResult = confirmPasswordValidation(
      password,
      confirmPassword
    );
    // Check if passwords match
    if (!confirmPasswordValidationResult.result) {
      setError(confirmPasswordValidationResult.message);
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      fetch("http://localhost:3000/auth/signupVendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: firstName + " " + lastName,
        }),
      })
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((data) => {
          if (data.user) {
            navigate("/login", { state: { account_created: true } });
          } else {
            handleOpen(data.message, "Warning");
          }
        })
        .catch((error) => {
          error
            .json()
            .then((data: { message: string }) =>
              handleOpen(data.message, "Error")
            );
        });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: 400,
            maxWidth: "none",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* Back Button */}
      <button
        className="btn btn-light position-absolute top-0 start-0 m-3"
        onClick={() => navigate("/")}
        style={{ zIndex: 10 }}
      >
        <i className="bi bi-arrow-left text-success"></i>
      </button>

      <div
        className="d-flex flex-column-reverse flex-md-row"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="card bg-success rounded-6 shadow-lg w-100">
            <h1 className="lead text-center text-light m-3 card-title">
              Register
            </h1>
            <form className="px-4 py-3" onSubmit={onSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="form-group">
                <label htmlFor="firstName" className="text-light">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="text-light">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-light">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-light">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="text-light">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-light text-success btn-block m-4"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="d-flex justify-content-center text-light">
              <p
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Have an account? Login
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={image} alt="sign up" className="img rounded" />
        </div>
      </div>
    </>
  );
}
