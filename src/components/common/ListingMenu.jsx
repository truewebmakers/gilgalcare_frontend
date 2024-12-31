import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListingMenu = ({ activeMenu }) => {
  const [menu2, setMenu2] = useState(false);
  return (
    <li className={activeMenu === "/listing-grid" || activeMenu === "/our-listing" || activeMenu === "/listing-list-sidebar" || activeMenu === "/listingmap-list" ||activeMenu === "/listingmap-grid" ? "has-submenu active" : "has-submenu"}>
      <Link to="" className={menu2 ? 'submenu' : ""}>
        Listings <i className="fas fa-chevron-down" onClick={() => setMenu2(!menu2)}></i>
      </Link>
      <ul className={menu2 ? "submenu d-block" : "submenu"}>
        <li className={activeMenu === "/listing-grid" ? "active" : ""}>
          <Link to="/listing-grid">Listing Grid</Link>
        </li>
        <li className={activeMenu === "/our-listing" ? "active" : ""}>
          <Link to="/our-listing">Listing Grid Sidebar</Link>
        </li>
        <li className={activeMenu === "/listing-list-sidebar" ? "active" : ""}>
          <Link to="/listing-list-sidebar">Listing List Sidebar</Link>
        </li>
        <li className={activeMenu === "/listingmap-list" ? "active" : ""}>
          <Link to="/listingmap-list">Listing List Map</Link>
        </li>
        <li className={activeMenu === "/listingmap-grid" ? "active" : ""}>
          <Link to="/listingmap-grid">Listing Grid Map</Link>
        </li>
      </ul>
    </li>
  );
};

export default ListingMenu;
