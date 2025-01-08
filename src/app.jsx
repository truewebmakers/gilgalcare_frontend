import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/feather.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
import config from "config";
import { AdminRoutes } from "./Routes/AdminRoutes";
import { FrontendRoute } from "./Routes/PublicRoutes";
import Home5 from "./components/home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { NotLoggedInRoute } from "./Routes/NotLoggedInRoute";
import ScrollToTop from "./components/ScrollToTop";

export const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <BrowserRouter basename={`${config.publicPath}`}>
      <ScrollToTop />

      <Routes>
        <Route path="/" index element={<Home5 />} />
        {FrontendRoute.map((item, key) => {
          return <Route key={key} path={item.path} element={item.element} />;
        })}
      </Routes>

      <Routes path="/">
        {AdminRoutes.map((item, key) => {
          return (
            <Route
              key={key}
              path={item.path}
              element={<ProtectedRoute>{item.element}</ProtectedRoute>}
            />
          );
        })}
      </Routes>

      <Routes path="/">
        {NotLoggedInRoute.map((item, key) => {
          return (
            <Route
              key={key}
              path={item.path}
              element={
                !isLoggedIn ? (
                  item.element
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
