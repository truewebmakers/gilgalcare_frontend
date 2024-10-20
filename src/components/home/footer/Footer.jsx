import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FooterLogo, LogoBGR } from "../../imagepath";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="footer footer-five">
      <div className="footer-top aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="#">
                    <img src={LogoBGR} alt="logo" />
                  </Link>
                </div>
                <div className="footer-content">
                  <p>
                    Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel
                    utom diska. Jinesade bel när feras redorade i belogi. FAR
                    paratyp i muvåning, och pesask vyfisat.{" "}
                  </p>
                </div>
                <div className="social-icon">
                  <ul>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-facebook-f"></i>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-twitter"></i>{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6"></div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Categories</h2>
                <ul>
                  <li>
                    <Link to="#">Restaurant</Link>
                  </li>
                  <li>
                    <Link to="#">Beauty</Link>
                  </li>
                  <li>
                    <Link to="#">Fitness</Link>
                  </li>
                  <li>
                    <Link to="#">Night Life</Link>
                  </li>
                  <li>
                    <Link to="#">Shopping</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6"></div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2 className="footer-title">Support</h2>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <i className="feather-phone me-2"></i>
                    <p> (406) 555-0120 </p>
                  </div>
                  <div className="footer-address">
                    <i className="feather-mail me-2"></i>
                    <p> listee@example.com </p>
                  </div>
                  <div className="footer-address">
                    <i className="feather-map-pin me-2"></i>
                    <p> 2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-12">
                <div className="copyright-text text-center">
                  <p className="mb-0">
                    2024 &copy; GilgalCareProvider. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
