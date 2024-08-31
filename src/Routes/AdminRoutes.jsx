import React from "react";
import Dashboard from "../components/userPages/Dashboard";
import Profile from "../components/userPages/profile";
import Bookmarks from "../components/userPages/bookmark";
import MyListe from "../components/userPages/mylisting";
import Message from "../components/userPages/mesage";
import Review from "../components/userPages/review";
import AddLisiting from "../components/userPages/AddLisiting";
import AddCategory from "../components/userPages/addCategory";
import ServiceDetails from "../components/Listings/PublicListingDetails/serviceDetails";
import EditLisiting from "../components/userPages/editListing";
import MyListingDetails from "../components/Listings/MyListingDetails";

export const AdminRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "add-category",
    element: <AddCategory />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "my-listing",
    element: <MyListe />,
  },
  {
    path: "bookmarks",
    element: <Bookmarks />,
  },
  {
    path: "reviews",
    element: <Review />,
  },
  {
    path: "messages",
    element: <Message />,
  },
  {
    path: "add-listing",
    element: <AddLisiting />,
  },
  {
    path: "edit-listing/:id",
    element: <EditLisiting />,
  },

  {
    path: "my-listing-details/:id",
    element: <MyListingDetails />,
  },
];
