import React from "react";
import { about_img, cta_img, quotes } from "../../imagepath";
import Cilent from "./silder/cilent";
import { Link, useLocation } from "react-router-dom";
import Header from "../../home/header/Header";
import Footer from "../../home/footer/Footer";

const About = () => {
  const parms = useLocation().pathname;

  return (
    <>
      <Header parms={parms} />
      {/*Inner Banner*/}
      <div className="aboutbanner innerbanner">
        <div className="inner-breadcrumb">
          <div className="container">
            <div className="row align-items-center text-center">
              <div className="col-md-12 col-12 ">
                <h2 className="breadcrumb-title">About Us</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      About us
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/Inner Banner*/}
      {/*About Content*/}
      <section className="about-content">
        <div className="container">
          <div className="about-listee">
            <div className="about-img">
              <img
                src={about_img}
                className="img-fluid"
                alt=""
                height={650}
                width={650}
              />
            </div>
            <div className="about-info">
              <h4>
                {" "}
                <span>About</span> Gilgal
              </h4>
              <p>
                At Gilgal Provider Finder, we believe in empowering every NDIS
                participant with the freedom to choose from the best, most
                reliable service providers available. Our platform meticulously
                selects each provider to ensure you receive top-tier support
                tailored to your unique needs. Whether you're seeking assistance
                with daily activities or specialized therapeutic support, our
                user-friendly interface makes it easy to find trusted providers
                in your community.
              </p>
              <p>
                At Gilgal Provider Finder, we empower NDIS participants by
                connecting them with a curated list of reliable and high-quality
                service providers. Our platform is designed with your needs in
                mind, ensuring you find the support you deserve, close to home.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*/About Content*/}
      {/*How It Works*/}
      <section className="howitworks">
        <div className="container">
          <h3>How It Works</h3>
          <p>Your Guide to Finding the Right Support Quickly and Efficiently</p>

          <div className="row">
            <div className="col-lg-4 col-md-4 d-flex">
              <div className="howitwork-info">
                <h5>01</h5>
                <h6>Search</h6>
                <p>
                  Enter your location and service requirements to see a list of
                  available NDIS providers near you.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex">
              <div className="howitwork-info">
                <h5>02</h5>
                <h6>Compare</h6>
                <p>
                  View detailed profiles, read reviews, and compare service
                  offerings to ensure you find the perfect match for your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 d-flex">
              <div className="howitwork-info">
                <h5>03</h5>
                <h6>Connect</h6>
                <p>
                  Use our secure platform to contact providers directly and
                  arrange the services you require with confidence and ease.
                </p>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-3 d-flex">
              <div className="howitwork-info">
                <h5>04</h5>
                <h6>Post An Ad</h6>
                <p>
                  Morbi nisi justo, venenatis ac nibh at, bibendum mattis risus.
                  Maecenas tincidunt, ligula sed congue tempus, magna augue
                  cursus ipsum, in malesuada justo risus nec lorem. Nam augue
                  augue, mollis nec condimentum euismod, lacinia ultricies leo.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/*/How It Works*/}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="cta-content">
                <h3>
                  Earn Cash by <span>Selling</span> <br />
                  or Find Anything you desire
                </h3>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humo or randomised words which don't look
                  even slightlys
                </p>
                <div className="cta-btn">
                  <Link to="/add-listing" className="btn-primary postad-btn">
                    List Your Business
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-img">
                <img
                  src={cta_img}
                  className="img-fluid"
                  alt="CTA"
                  style={{ borderRadius: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /CTA Section */}
      {/* Client Testimonilas Section */}
      <section className="testimonials-section">
        <div className="row">
          <div className="col-lg-5">
            <div className="testimonial-heading d-flex">
              <h4>
                {" "}
                Client <br /> Testimonials
              </h4>
              <img src={quotes} alt="quotes" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="rightimg" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="testimonials-slidersection">
              <div className="owl-nav mynav1" />
              <Cilent />
            </div>
          </div>
        </div>
      </section>
      {/* /Client Testimonilas Section */}

      <Footer />
    </>
  );
};
export default About;
