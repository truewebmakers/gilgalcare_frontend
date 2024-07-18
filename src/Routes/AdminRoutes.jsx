import React from "react";
import Dashboard from "../components/userPages/Dashboard";
import Profile from "../components/userPages/profile";
import Bookmarks from "../components/userPages/bookmark";
import MyListe from "../components/userPages/mylisting";
import Message from "../components/userPages/mesage";
import Review from "../components/userPages/review";
import AddLisiting from "../components/userPages/AddLisiting";

export const AdminRoutes = [
    {
        path:'dashboard',
        element: <Dashboard/> 
    },
    {
        path:'profile',
        element: <Profile/> 
    },
    {
        path:'my-listing',
        element: <MyListe/> 
    },
    {
        path:'bookmarks',
        element: <Bookmarks/> 
    },
    {
        path:'reviews',
        element: <Review/> 
    },
    {
        path:'messages',
        element: <Message/> 
    },
    {
        path:'add-listing',
        element: <AddLisiting/> 
    }
];

 