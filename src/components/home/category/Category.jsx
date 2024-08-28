import React from "react";
import { Category27Svg } from "../../imagepath";

export const Category = ({ categories }) => {
  return (
    <section className="category-five-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div
              className="section-heading heading-five aos"
              data-aos="fade-up"
            >
              <h2>Our Categories</h2>
            </div>
          </div>
          <div className="col-md-12">
            <ul className="category-items text-center">
              {categories?.map((item) => (
                <li className="aos" data-aos="fade-up" key={item?.value}>
                  <div className="categories-box">
                    <div className="categories-info">
                      <span>
                        <img
                          src={item?.image || Category27Svg}
                          className="img-fluid"
                          alt="img"
                          height={50}
                          width={50}
                        />
                      </span>
                      <h6>{item?.label}</h6>
                      <p>{item?.location}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {/* <ul className="category-items text-center">
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category18Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Restaurant</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category19Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Beauty & Care</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category20Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Fitness</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category21Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Night Life</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category22Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Shopping</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category23Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Cinema</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="category-items cate-row2">
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category24Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Lodging</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category25Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Outdoors</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category26Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Automotive</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category27Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Marketing</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
              <li className="aos" data-aos="fade-up">
                <div className="categories-box">
                  <div className="categories-info">
                    <span>
                      <img
                        src={Category28Svg}
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <h6>Child Care</h6>
                    <p>09 Ads</p>
                  </div>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
};
