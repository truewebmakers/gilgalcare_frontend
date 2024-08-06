import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { passwordValidations } from "../../../utils/validations";
import UseApi from "../../../hooks/useApi";
import { apiMethods, apiUrls } from "../../../constants/constant";
import { toast } from "react-toastify";

export const ChangePassword = () => {
    const [pass, setPass] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { user } = useSelector((state) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPass({ ...pass, [name]: value });
        if (disable) {
            const newErr = passwordValidations(name, value);
            setError((prevError) => ({ ...prevError, ...newErr }));
        }
    };
    const hasErrors = (error) => {
        return Object.values(error).some((err) => err);
    };

    const areAllFieldsFilled = (data) => {
        return Object.values(data).every((field) => field);
    };

    useEffect(() => {
        if (hasErrors(error)) {
            setDisable(true);
            return;
        }
        setDisable(false);
    }, [error]);

    // onclick handlers
    const handleChangePassword = async (e) => {
        e.preventDefault();
        let newErr = {};
        for (let key in pass) {
            newErr = { ...newErr, ...passwordValidations(key, pass[key]) };
        }
        setError(newErr);
        if (!hasErrors(error) && areAllFieldsFilled(pass)) {
            handleUpdatePasswords();
        }
    };

    const handleUpdatePasswords = async () => {
        setIsLoading(true);
        try {
            // headers
            const headers = {
                Authorization: `Bearer ${user?.token}`,
            };
            // Prepare data for API
            const bodyData = {
                current_password: pass?.oldPassword,
                new_password: pass?.newPassword,
                new_password_confirmation: pass?.confirmPassword,
            };
            // Call API
            const response = await UseApi(
                apiUrls.changePassword + user?.userInfo?.id,
                apiMethods.POST,
                bodyData,
                headers
            );
            if (response?.status == 201 || response?.status == 200) {
                toast.success(response?.data?.message);
                setPass({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setIsLoading(false);
                return;
            } else {
                toast.error(response?.data?.message);
                setIsLoading(false);
            }
        } catch (err) {
            toast.error(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="col-lg-3">
            <div className="profile-sidebar">
                <div className="card">
                    <div className="card-header">
                        <h4>Change Password</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Current Password</label>
                                <div className="pass-group group-img">
                                    <span className="lock-icon">
                                        <i className="feather-lock" />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control pass-input"
                                        placeholder="Enter Current Password"
                                        name="oldPassword"
                                        value={pass?.oldPassword}
                                        onChange={handleOnChange}
                                    />
                                    {error?.oldPassword && (
                                        <p style={{ color: "red" }}>{error?.oldPassword}</p>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">New Password</label>
                                <div className="pass-group group-img">
                                    <span className="lock-icon">
                                        <i className="feather-lock" />
                                    </span>
                                    <input
                                        type='password'
                                        className="form-control pass-input"
                                        placeholder="Enter New Password"
                                        name="newPassword"
                                        value={pass?.newPassword}
                                        onChange={handleOnChange}

                                    />
                                     {error?.newPassword && (
                                        <p style={{ color: "red" }}>{error?.newPassword}</p>
                                    )}
                                    {/* <span className={`toggle-password  ${ passwordType==="password"? "feather-eye":"feather-eye-off" } `} onClick={togglePassword} /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">
                                    Confirm New Password
                                </label>
                                <div className="pass-group group-img">
                                    <span className="lock-icon">
                                        <i className="feather-lock" />
                                    </span>
                                    <input
                                        type='password'
                                        className="form-control pass-input"
                                        placeholder="Confirm Your Password"
                                        name='confirmPassword'
                                        value={pass?.confirmPassword}
                                        onChange={handleOnChange}

                                    />
                                     {error?.confirmPassword && (
                                        <p style={{ color: "red" }}>{error?.confirmPassword}</p>
                                    )}
                                    {/* <span className={`toggle-password  ${ passwordType==="password"? "feather-eye":"feather-eye-off" } `} onClick={togglePassword} /> */}
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit" onClick={(e) => handleChangePassword(e)}>
                                {" "}
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}