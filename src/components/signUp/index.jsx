import React, { useEffect } from "react";
import Header from "../home/header/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../home/footer/Footer";
import { useState } from "react";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { toast } from "react-toastify";
import { handleValidations } from "../../utils/validations";
import { path } from "../../constants/routesConstant";
import Loader from "../common/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [signupData, setSignUpData] = useState({
    name: "",
    email:'',
    passwordInput: "",
    user_type: "business", //business, admin
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    passwordInput: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignUpData({ ...signupData, [name]: value });
    if (disable) {
      const newErr = handleValidations(name, value);
      setError((prevError) => ({ ...prevError, ...newErr }));
    }
  };

  const hasErrors = (error) => {
    return Object.values(error).some((err) => err);
  };

  const areAllFieldsFilled = (data) => {
    return Object.values(data)?.every((field) => field);
  };

  useEffect(() => {
    if (hasErrors(error)) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }, [error]);


  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleSignUp = async (e) => {
    e.preventDefault()
    let newErr = {};
    for (let key in signupData) {
      newErr = { ...newErr, ...handleValidations(key, signupData[key]) };
    }
    setError(newErr);
    if (
      !hasErrors(newErr) && areAllFieldsFilled(signupData)
    ) {
      setIsLoading(true);
      try {
        // Prepare data for signup API
        const bodyData = {
          name: signupData?.name,
          email: signupData?.email,
          password: signupData?.passwordInput,
          user_type: signupData?.user_type, 
        };
        // Call signup API
        const response = await UseApi(
          apiUrls.signup,
          apiMethods.POST,
          bodyData
        );
        if (response?.status == 201 || response?.status == 200) {
          toast.success(response?.data?.message);
          navigate(path.login);
          setIsLoading(false);
          return;
        } else {
          toast.error(response?.data?.message);
          setIsLoading(false);
        }
      } catch (err) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      {/* Breadscrumb Section */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Create an Account</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Register
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
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>Create an Account</h3>
                  <p>
                    Lets start with <span>Gilgil</span>
                  </p>
                </div>
                {/* Login Form */}
                <form action="login">
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-user" />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Name"
                        name="name"
                        value={signupData?.name}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                       {error?.name && (
                    <p style={{ color: "red" }}>{error?.name}</p>
                  )}
                    </div>
                  </div>
                  <div className="form-group group-img">
                    <div className="group-img">
                      <i className="feather-mail" />
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={signupData?.email}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                       {error?.email && (
                    <p style={{ color: "red" }}>{error?.email}</p>
                  )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="pass-group group-img">
                      <i className="feather-lock" />
                      <input
                        type={passwordType}
                        className="form-control pass-input"
                        placeholder="Password"
                        name="passwordInput"
                        value={signupData?.passwordInput}
                        onChange={handleChange}
                        autoComplete="off"
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
                    {error?.passwordInput && (
                    <p style={{ color: "red" }}>{error?.passwordInput}</p>
                  )}
                  </div>
                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                    disabled={disable}
                    onClick={(e)=>handleSignUp(e)}
                  >
                     {isLoading ? (
                            <>
                                &nbsp;&nbsp; <Loader />
                            </>
                        ) : (
                          `Create Account`
                        )}
                   
                  </button>
                  <div className="register-link text-center">
                    <p>
                      Already have an account?{" "}
                      <Link className="forgot-link" to="/login">
                        Sign In
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
export default SignUp;
