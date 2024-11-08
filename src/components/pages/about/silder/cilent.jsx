import React from "react";
import { Testimonial1, Testimonial2 } from "../../../imagepath";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Cilent = () => {
  const settings = {
    // autoWidth: true,
    items: 3,
    margin: 25,
    dots: false,
    nav: true,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],

    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
    },
  };
  return (
    <>
      <div>
        <OwlCarousel {...settings} className="owl-carousel testi-slider">
          <div className="testimonial-info">
            <div className="testimonialslider-heading d-flex">
              <div className="testi-img">
                <img src={Testimonial1} className="img-fluid" alt="testi-img" />
              </div>
              <div className="testi-author">
                <h6>James L.</h6>
                <p>Melbourne</p>
              </div>
            </div>
            <div className="testimonialslider-content">
              <p>
                Found Gilgal Provider Finder while looking for local personal
                care services. The site was super easy to navigate, and I
                quickly matched with a fantastic team. They're always on time
                and understand exactly what I need. Couldn't be happier!
              </p>
            </div>
          </div>
          <div className="testimonial-info">
            <div className="testimonialslider-heading d-flex">
              <div className="testi-img">
                <img src={Testimonial2} className="img-fluid" alt="testi-img" />
              </div>
              <div className="testi-author">
                <h6>Sandra K.</h6>
                <p>Sydney</p>
              </div>
            </div>
            <div className="testimonialslider-content">
              <p>
                I needed help with my NDIS plan and wasn't sure where to start.
                Gilgal Provider Finder popped up in my search, and I decided to
                try it out. The coordinator I connected with was a lifesaver,
                explained everything and helped me get everything sorted.
              </p>
            </div>
          </div>
          <div className="testimonial-info">
            <div className="testimonialslider-heading d-flex">
              <div className="testi-img">
                <img src={Testimonial2} className="img-fluid" alt="testi-img" />
              </div>
              <div className="testi-author">
                <h6>Harpreet Singh</h6>
                <p>Melbourne</p>
              </div>
            </div>
            <div className="testimonialslider-content">
              <p>
                I used Gilgal Provider Finder on a friend’s recommendation to
                find a NDIS cleaning business. The process was straightforward,
                and I appreciated the quick responses from providers.
              </p>
            </div>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
};
export default Cilent;
