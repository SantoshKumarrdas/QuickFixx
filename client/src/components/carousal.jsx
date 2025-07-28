//Carousel.jsx

import React from 'react';
import Slider from 'react-slick';
import '../css/carousal.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Carousel = () => {
 const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  dots: true,
  pauseOnHover: false,
  cssEase: "ease-in-out"
};


    return (
        <>
            <div className="full-width-carousel">
                <Slider {...settings}>
                    <div className="full-width-slide">
                        <img src=
                            "/img/ele.jpg"
                            alt="Slide 1"
                            className="slide-image" />
                    </div>
                    <div className="full-width-slide">
                        <img src=
                            "/img/banner.jpeg"
                            alt="Slide 2"
                            className="slide-image" />
                    </div>
                    <div className="full-width-slide">
                        <img src=
                            "/img/banner1.jpeg"
                            alt="Slide 3"
                            className="slide-image" />
                    </div>
                </Slider>
            </div>
        </>
    );
};

export default Carousel;