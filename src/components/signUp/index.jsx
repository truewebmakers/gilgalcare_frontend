import React, { useEffect, useState } from "react";
import Header from "../home/header/Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../home/footer/Footer";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { toast } from "react-toastify";
import { handleValidations } from "../../utils/validations";
import { path } from "../../constants/routesConstant";
import Loader from "../common/Loader";
import { registerService } from "../../services/registerService";
import { customToast } from "../common/Toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    passwordInput: "",
    user_type: "user", // default is user
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
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const checkValidEmail = async () => {
    const body = {
      email: signupData?.email,
    };
    const response = await UseApi(apiUrls.checkEmail, apiMethods.POST, body);
    const isExist = response?.data?.exists;
    return isExist;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // If user selects "business", navigate to the pricing page and prevent API call

    let newErr = {};
    for (let key in signupData) {
      newErr = { ...newErr, ...handleValidations(key, signupData[key]) };
    }
    setError(newErr);

    if (!hasErrors(newErr) && areAllFieldsFilled(signupData)) {
      setIsLoading(true);

      if (signupData?.user_type?.toLowerCase() === "business") {
        const isExist = await checkValidEmail();
        if (!isExist) {
          navigate("/pricing", { state: { signupData } });
          setIsLoading(false);
        } else {
          customToast.error("This email already exists.");
          setIsLoading(false);
        }
        return;
      }
      try {
        const res = await registerService(signupData);
        if (res?.successStatus === true) {
          navigate(path.login);
        }
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
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

      <div className="login-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-5 mx-auto">
              <div className="login-wrap register-form">
                <div className="login-header">
                  <h3>Create an Account</h3>
                  <p>
                    Lets start with <span>Gilgal</span>
                  </p>
                </div>

                <form action="login">
                  {/* Name input */}
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

                  {/* Email input */}
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

                  {/* Password input */}
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
                        className={`toggle-password ${
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

                  {/* User Type Radio Buttons */}
                  <div className="form-group">
                    <label>Type:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user_type"
                          value="user"
                          checked={
                            signupData?.user_type?.toLowerCase() === "user"
                          }
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Participant</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="user_type"
                          value="business"
                          checked={
                            signupData?.user_type?.toLowerCase() === "business"
                          }
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Providers</label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="btn btn-primary w-100 login-btn"
                    type="submit"
                    disabled={disable}
                    onClick={(e) => handleSignUp(e)}
                  >
                    {isLoading ? <Loader /> : `Create Account`}
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
