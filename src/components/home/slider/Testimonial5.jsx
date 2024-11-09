import React from "react";
import {
  profile_pic,
  ProfileAvatar06,
  Testimonial1,
  Testimonial2,
} from "../../imagepath";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonial5 = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    lazyLoad: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
  };
  return (
    <section className="testimonial-five-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div
              className="section-heading heading-five aos"
              data-aos="fade-up"
            >
              <h2>Our Customer’s Says</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="silderBotton testi-five-slider">
              <Slider {...settings}>
                <div
                  className="testimonial-info testi-four testi-five aos"
                  data-aos="fade-up"
                >
                  <div className="testimonialslider-content">
                    <span>
                      <i className="fa-solid fa-quote-left"></i>
                    </span>
                    <h6>It was a wonderful experience</h6>
                    <p>
                      Found Gilgal Provider Finder while looking for local
                      personal care services. The site was super easy to
                      navigate, and I quickly matched with a fantastic team.
                      They're always on time and understand exactly what I need.
                      Couldn't be happier!
                    </p>
                  </div>
                  <div className="testimonialslider-heading d-flex">
                    <div className="testi-img">
                      <img
                        src={profile_pic}
                        className="img-fluid"
                        alt=""
                        height={79}
                        width={79}
                      />{" "}
                    </div>
                    <div className="testi-author">
                      <h6>James L.</h6>
                    </div>
                  </div>
                </div>
                <div
                  className="testimonial-info testi-four testi-five aos"
                  data-aos="fade-up"
                >
                  <div className="testimonialslider-content">
                    <span>
                      <i className="fa-solid fa-quote-left"></i>
                    </span>
                    <h6>It was a very good experience</h6>
                    <p>
                      I needed help with my NDIS plan and wasn't sure where to
                      start. Gilgal Provider Finder popped up in my search, and
                      I decided to try it out. The coordinator I connected with
                      was a lifesaver, explained everything and helped me get
                      everything sorted.
                    </p>
                  </div>
                  <div className="testimonialslider-heading d-flex">
                    <div className="testi-img">
                      <img
                        src={profile_pic}
                        className="img-fluid"
                        alt=""
                        height={79}
                        width={79}
                      />{" "}
                    </div>
                    <div className="testi-author">
                      <h6>Sandra K.</h6>
                    </div>
                  </div>
                </div>
                <div
                  className="testimonial-info testi-four testi-five aos"
                  data-aos="fade-up"
                >
                  <div className="testimonialslider-content">
                    <span>
                      <i className="fa-solid fa-quote-left"></i>
                    </span>
                    <h6>Wonderful experience</h6>
                    <p>
                      I used Gilgal Provider Finder on a friend’s recommendation
                      to find a NDIS cleaning business. I decided to try it out.
                      The process was straightforward, and I appreciated the
                      quick responses from providers.
                    </p>
                  </div>
                  <div className="testimonialslider-heading d-flex">
                    <div className="testi-img">
                      <img
                        src={profile_pic}
                        className="img-fluid"
                        alt=""
                        height={79}
                        width={79}
                      />{" "}
                    </div>
                    <div className="testi-author">
                      <h6>Harpreet Singh</h6>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial5;
