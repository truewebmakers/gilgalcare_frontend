import React from "react";

export const Ratings = () => {
  return (
    <div className="card ">
      <div className="card-header  align-items-center">
        <i className="feather-star" />
        <h4>Ratings</h4>
      </div>
      <div className="card-body">
        <div className="ratings-content">
          <div className="row">
            <div className="col-lg-3">
              <div className="ratings-info">
                <p className="ratings-score">
                  <span>4</span>/5
                </p>
                <p>OVERALL</p>
                <p>
                  {" "}
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fas fa-star filled" />
                  <i className="fa-regular fa-star" />
                </p>
                <p>Based on Listing</p>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="ratings-table table-responsive">
                <table className="">
                  <tbody>
                    <tr>
                      <td className="star-ratings">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                      </td>
                      <td className="scrore-width">
                        <span> </span>
                      </td>
                      <td> 0</td>
                    </tr>
                    <tr>
                      <td className="star-ratings">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fa-regular fa-star rating-color" />
                      </td>
                      <td className="scrore-width selected">
                        <span> </span>
                      </td>
                      <td> 1</td>
                    </tr>
                    <tr>
                      <td className="star-ratings">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                      </td>
                      <td className="scrore-width">
                        <span> </span>
                      </td>
                      <td> 0</td>
                    </tr>
                    <tr>
                      <td className="star-ratings">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                      </td>
                      <td className="scrore-width">
                        <span> </span>
                      </td>
                      <td> 0</td>
                    </tr>
                    <tr>
                      <td className="star-ratings">
                        <i className="fas fa-star filled" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                        <i className="fa-regular fa-star rating-color" />
                      </td>
                      <td className="scrore-width">
                        <span> </span>
                      </td>
                      <td> 0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
