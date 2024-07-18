import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/home";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
// import "./assets/css/bootstrap.min.css.map";
import "./assets/css/feather.css";
// import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";  
import config from 'config';
import { AdminRoutes } from "./Routes/AdminRoutes";
import { FrontendRoute } from "./Routes/FrontendRoutes";
import Home5 from "./components/home";

export const App = () => {
  return (
    <BrowserRouter basename={`${config.publicPath}`}>
    <Routes  > 
      <Route  path="/" index element={<Home5 />} /> 
      { FrontendRoute.map((item,key)=>{
          return <Route key={key} path={item.path} element={item.element} />
      })}
    </Routes>

    <Routes path="/">
      
      { AdminRoutes.map((item,key)=>{ 
        // console.log("kasd",item)
          return <Route key={key} path={item.path} element={item.element} />
      })}
    </Routes>
    </BrowserRouter>
  );
};
