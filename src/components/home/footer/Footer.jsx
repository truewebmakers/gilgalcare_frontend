import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FooterLogo, LogoBGR } from "../../imagepath";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer footer-five">
      <div className="footer-top aos" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="#" onClick={scrollToTop}>
                    <img src={LogoBGR} alt="logo" />
                  </Link>
                </div>
                <div className="footer-content">
                  <p>
                    Gilgal Provider Finder empowers NDIS participants to connect
                    with trusted, top-quality service providers tailored to
                    their needs. Our user-friendly platform ensures access to
                    reliable support, from daily assistance to specialized
                    therapies, all within your community.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6"></div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget footer-menu">
                <h2 className="footer-title">Quick Links</h2>
                <ul>
                  <li>
                    <Link to="/" onClick={scrollToTop}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-listing" onClick={scrollToTop}>
                      Our Listing
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={scrollToTop}>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={scrollToTop}>
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={scrollToTop}>
                      Privacy & Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={scrollToTop}>
                      Terms & Conditions
                    </Link>
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
                    <p> gilgal@example.com </p>
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
                    {new Date().getFullYear()} &copy; GilgalCareProvider. All
                    rights reserved.
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
