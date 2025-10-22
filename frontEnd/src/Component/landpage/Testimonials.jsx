import React from "react";
import Slider from "react-slick";
import { TestimonialData } from "../Constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,  
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [      
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-16 max-w-5xl w-1/3 md:w-1/2 mx-auto">
      <Slider {...settings}>
        {TestimonialData.map((data, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={data.image}
                  alt={data.name}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {data.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{data.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 italic">{data.testimonial}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
