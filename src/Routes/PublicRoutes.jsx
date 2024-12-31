import React from "react";
import Home5 from "../components/home";
import Listing_Grid from "../components/Listings/ListingGrid";
import ListingMap from "../components/Listings/listingMap";
import GridSidebar from "../components/Listings/LisitingGridSidebar";
import ListSidebar from "../components/Listings/LisitingListSidebar";
import About from "../components/pages/about";
import Pricing from "../components/pages/about/pricing";
import Faq from "../components/pages/faq";
import Gallary from "../components/pages/gallary";
import Category from "../components/pages/category";
import HowItWork from "../components/pages/howitWork";
import TermsCondition from "../components/pages/termsCondition";
import PrivacyPolicy from "../components/pages/privacyPolicy";
import Error404 from "../components/pages/404error";
import Error504 from "../components/pages/504error";
import BlogList from "../components/blog/BlogList";
import BlogDetailsh from "../components/blog/BlogList/blogDatalish";
import BlogGrid from "../components/blog/BlogList/BlogGrid";
import BlogListSideBar from "../components/blog/BlogList/blogListSidebar";
import BlogGridSidebar from "../components/blog/BlogList/blogGridSidebar";
import Contract from "../components/contract";
import ServiceDetails from "../components/Listings/PublicListingDetails/serviceDetails";
import PayNow from "../components/pages/payForm";

export const FrontendRoute = [
  {
    path: "/",
    element: <Home5 />,
  },
  {
    path: "listingmap-grid",
    element: <GridSidebar />,
  },
  {
    path: "listing-grid",
    element: <Listing_Grid />,
  },
  {
    path: "listingmap-list",
    element: <ListingMap />,
  },
  {
    path: "our-listing",
    element: <GridSidebar />,
  },
  {
    path: "listing-list-sidebar",
    element: <ListSidebar />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "pricing",
    element: <Pricing />,
  },
  {
    path: "paynow/:id",
    element: <PayNow />,
  },
  {
    path: "faq",
    element: <Faq />,
  },
  {
    path: "gallery",
    element: <Gallary />,
  },
  {
    path: "categories",
    element: <Category />,
  },
  {
    path: "howitworks",
    element: <HowItWork />,
  },
  {
    path: "terms-condition",
    element: <TermsCondition />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "error-404",
    element: <Error404 />,
  },
  {
    path: "error-500",
    element: <Error504 />,
  },
  {
    path: "blog-list",
    element: <BlogList />,
  },
  {
    path: "blog-details",
    element: <BlogDetailsh />,
  },
  {
    path: "blog-grid",
    element: <BlogGrid />,
  },
  {
    path: "blog-list-sidebar",
    element: <BlogListSideBar />,
  },
  {
    path: "blog-grid-sidebar",
    element: <BlogGridSidebar />,
  },
  {
    path: "contact",
    element: <Contract />,
  },
  {
    path: "listing-details/:id",
    element: <ServiceDetails />,
  },
];
