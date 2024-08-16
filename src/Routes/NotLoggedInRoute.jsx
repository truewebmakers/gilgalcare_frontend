import React from "react";
import SignUp from "../components/signUp";
import Login from "../components/login";
import ForgotPassword from "../components/forgotPassword";

export const NotLoggedInRoute = [
    {
        path: 'signup',
        element: <SignUp/>
    },
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'forgot-password',
        element: <ForgotPassword/>
    }
];


 