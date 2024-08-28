import React from "react";
import { Link } from "react-router-dom";
import { CapitalizeFirstLetter } from "../utils/commonFunctions";
export const myListingColumns = (handleDeleteListing) => [
  {
    title: "Title",
    dataIndex: "listing_title",
    render: (text) => (
      <div className="listingtable-rate"> {text ? text : "-"}</div>
    ),
  },
  {
    title: "Category",
    render: (text) => (
      <>
        <div className="listingtable-rate">
          {text?.category ? text?.category?.name : "-"}
        </div>
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
        <Link to={`/edit-listing/${text?.id}`} className="action-btn btn-edit">
          <i className="feather-edit-3" />
        </Link>
        <span
          className="action-btn btn-trash"
          onClick={(e) => handleDeleteListing(e, text?.id)}
        >
          <i className="feather-trash-2" />
        </span>
        <Link
          to={`/service-details/${text?.id}`}
          className="action-btn btn-view"
        >
          <i className="feather-view-3" />
        </Link>
      </div>
    ),
  },
];
