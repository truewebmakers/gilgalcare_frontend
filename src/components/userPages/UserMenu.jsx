import React from 'react';
import { Link } from 'react-router-dom';

export default function UserMenu({activeUrl}) {
  return (
    <div className="">
                        <ul className="dashborad-menus">
                            <li className={(activeUrl == 'dashboard') ? 'active' : ''}>
                                <Link to="/dashboard">
                                    <i className="feather-grid" /> <span>Dashboard</span>
                                </Link>
                            </li>
                            <li className={(activeUrl == 'profile') ? 'active' : ''}>
                                <Link to="/profile">
                                    <i className="fa-solid fa-user" /> <span>Profile</span>
                                </Link>
                            </li>
                            <li className={(activeUrl == 'my-listing') ? 'active' : ''}>
                                <Link to="/my-listing">
                                    <i className="feather-list" /> <span>My Listing</span>
                                </Link>
                            </li>
                            {/* <li className={(activeUrl == 'bookmark') ? 'active' : ''}>
                                <Link to="/bookmarks">
                                    <i className="fas fa-solid fa-heart" /> <span>Bookmarks</span>
                                </Link>
                            </li> */}
                            {/* <li className={(activeUrl == 'message') ? 'active' : ''}>
                                <Link to="/messages">
                                    <i className="fa-solid fa-comment-dots" /> <span>Messages</span>
                                </Link>
                            </li> */}
                            <li className={(activeUrl == 'review') ? 'active' : ''}> 
                                <Link to="/reviews">
                                    <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    <i className="fas fa-light fa-circle-arrow-left" />{" "}
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
  );
}
