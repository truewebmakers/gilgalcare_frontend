import React from 'react';
import { Link } from 'react-router-dom';

export default function UserBreadCrumb({path,pageName}) {
  return (
        <div className="breadcrumb-bar">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-md-12 col-12">
                            <h2 className="breadcrumb-title">{pageName}</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">{path}</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                    {pageName}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
  );
}
