import React from "react";
import { Link } from "react-router-dom";
import { CapitalizeFirstLetter } from "../utils/commonFunctions";
import BookmarkIcon from "../assets/img/icons/bookmark.svg";
export const myListingColumns = (handleDeleteListing) => [
  {
    title: "Title",
    dataIndex: "listing_title",
    render: (text) => (
      <>
        <div className=""> {text ? text : "-"}</div>
      </>
    ),
  },
  {
    title: "Category",
    render: (text) => (
      <>
        <div className="">{text?.category ? text?.category?.name : "-"}</div>
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      <span className="">{text ? CapitalizeFirstLetter(text) : "-"}</span>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    render: (text) => <span>{text ? CapitalizeFirstLetter(text) : "-"}</span>,
  },
  {
    title: "Action",
    render: (text) => (
      <div className="listingtable-rate">
        <Link
          to={`/edit-listing/${text?.uuid}`}
          state={{ id: text?.id }}
          className="action-btn btn-edit"
        >
          <i className="feather-edit-2" />
        </Link>
        <span
          className="action-btn btn-trash"
          onClick={(e) => handleDeleteListing(e, text?.id)}
        >
          <i className="feather-trash-2" />
        </span>
        <Link
          to={`/my-listing-details/${text?.uuid}`}
          state={{ id: text?.id }}
          className="action-btn btn-view"
        >
          <i className="feather-eye" />
        </Link>
      </div>
    ),
  },
];

export const myCategoryListingColumns = (handleDeleteListing) => [
  {
    title: "Image",
    dataIndex: "feature_image",
    render: (text) => (
      <>
        <span className="">
          <img src={text || BookmarkIcon} height={25} width={25} />{" "}
        </span>
      </>
    ),
  },
  {
    title: "Category",
    render: (text) => (
      <>
        <span className="">{text?.name ? text?.name : "-"}</span>
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      <span className="">{text ? CapitalizeFirstLetter(text) : "-"}</span>
    ),
  },
  {
    title: "Location",
    dataIndex: "location",
    render: (text) => <span>{text ? CapitalizeFirstLetter(text) : "-"}</span>,
  },
  {
    title: "Action",
    render: (text) => (
      <div className="listingtable-rate">
        <Link
          to={`/edit-category/${text?.id}`}
          state={{ id: text?.id }}
          className="action-btn btn-edit"
        >
          <i className="feather-edit-2" />
        </Link>
        <span
          className="action-btn btn-trash"
          onClick={(e) => handleDeleteListing(e, text?.id)}
        >
          <i className="feather-trash-2" />
        </span>
      </div>
    ),
  },
];
