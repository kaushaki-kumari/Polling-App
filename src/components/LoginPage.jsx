import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setCredentials,
    updateEmail,
    updatePassword,
    validateForm,
    togglePasswordVisibility,
    resetForm,
} from "../redux/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/loginPage.css";

const LoginPage = () => {
    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);
    const errors = useSelector((state) => state.user.errors);
    const isSubmitted = useSelector((state) => state.user.isSubmitted);
    const showPassword = useSelector((state) => state.user.showPassword);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(validateForm());

        if (!errors.email && !errors.password && email && password) {
            dispatch(setCredentials({ email, password }));
            alert("Logged in successfully!");
            dispatch(resetForm());
        }
    };

    const handleEmailChange = (e) => {
        dispatch(updateEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        dispatch(updatePassword(e.target.value));
    };

    const togglePasswordVisibilityHandler = () => {
        dispatch(togglePasswordVisibility());
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="shadow-lg p-4 card">
                <div className="text-center">
                    <h3 className="fs-1">Login</h3>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fs-5">
                            Email address
                        </label>
                        <input
                            type="email"
                            className={`form-control ${isSubmitted && errors.email ? "is-invalid" : ""}`}
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter Your Email"
                        />
                        {isSubmitted && errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fs-5">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${isSubmitted && errors.password ? "is-invalid" : ""}`}
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="btn toggle-password-btn"
                                onClick={togglePasswordVisibilityHandler}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {isSubmitted && errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center text-align-center mt-3">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <p>
                            Don't have an account?{" "}
                            <a href="/signup" className="text-primary hover-Account">
                                Create an account
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;