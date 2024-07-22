import React, { useState } from "react";
import Header from "../home/header/Header";
import Footer from "../home/footer/Footer";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [loginData, setLoginData] = useState({
    passwordInput: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleLogin = () => {};

  return (
    <>
      <Header />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Login</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Login
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadscrumb Section */}
      {/* Login Section */}
      <div className="login-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap">
                <div className="login-header">
                  <h3>Welcome Back</h3>
                  <p>Please Enter your Details</p>
                </div>
                {/* Login Form */}
                <form action="dashboard">
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-mail" />
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={loginData?.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="pass-group group-img">
                      <i className="feather-lock" />
                      <input
                        type={passwordType}
                        className="form-control pass-input"
                        placeholder="Password"
                        onChange={handleChange}
                        value={loginData?.passwordInput}
                        name="passwordInput"
                      />
                      <span
                        className={`toggle-password  ${
                          passwordType === "password"
                            ? "feather-eye"
                            : "feather-eye-off"
                        } `}
                        onClick={togglePassword}
                      ></span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                    onClick={handleLogin}
                    disabled={disable}
                  >
                    Sign in
                  </button>
                  <div className="register-link text-center">
                    <p>
                      No account yet?{" "}
                      <Link className="forgot-link" to="/signup">
                        Signup
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
