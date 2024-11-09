import React from "react";
import Dashboard from "../components/userPages/Dashboard";
import Profile from "../components/userPages/profile";
import Bookmarks from "../components/userPages/bookmark";
import MyListe from "../components/userPages/mylisting";
import Message from "../components/userPages/mesage";
import Review from "../components/userPages/review";
import AddLisiting from "../components/userPages/AddLisiting";
import AddCategory from "../components/userPages/addCategory";
import MyListingDetails from "../components/Listings/MyListingDetails";
import MyCategory from "../components/userPages/myCategory";
import MyPlans from "../components/userPages/myPlans";
import AddPlans from "../components/userPages/myPlans/addPlans";

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
    path: "edit-category/:id",
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
    path: "my-plans",
    element: <MyPlans />,
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
    path: "add-plans",
    element: <AddPlans />,
  },
  {
    path: "edit-plans/:id",
    element: <AddPlans />,
  },
  {
    path: "edit-listing/:id",
    element: <AddLisiting />,
  },

  {
    path: "my-listing-details/:id",
    element: <MyListingDetails />,
  },
  {
    path: "my-category",
    element: <MyCategory />,
  },
];
