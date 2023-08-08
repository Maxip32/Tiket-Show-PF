/* eslint-disable react/prop-types */
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const Reviews = () => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    speed: 500,
    slidesToScroll: 2,
    initialSlide: 1,
    prevArrow: <FiArrowLeftCircle color="#ed4690"/>,
    nextArrow: <FiArrowRightCircle color="#ed4690"/>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        }
      },
    ]
  };

  const cards = [
    "HOLA",
    "KennyGi",
    "maxi",
    "Darwin",
    "Juan",
    "Daniel",
    "Emmanuel",
    "Rodrigo",
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-92 mt-8 mb-6 max-w-6xl">
      <span className="mt-2 mb-7 font-bold text-3xl text-DarkTextPurple">Reseñas de los clientes que confían en nosotros </span>
      <Slider {...settings} className="w-4/5">
        {cards.map((card, index) => (
          <section key={index} className=" md:w-full md:h-92 overflow-hidden">
            <div className="relative items-center w-full py-4 mx-auto px-4 max-w-7xl">
              <div className="grid grid-cols-1">
                <div className="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
                  <img
                    alt="team"
                    className="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl"
                    src="https://storage.googleapis.com/indie-hackers.appspot.com/avatars/300x300_DUFTlhOdmSdoT9F4r1Woo40pyML2.webp"
                  />
                  <div className="p-6 lg:text-center">
                    <span className="mb-4 text-xs font-semibold tracking-widest text-blue-600 uppercase">
                      ⭐️ ⭐️ ⭐️ ⭐️ 
                    </span>
                    <h4 className="mt-4 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">
                      {card}
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quia cupiditate veniam voluptatibus totam fuga vel nam
                      perspiciatis velit iste? Facere distinctio fugit nisi
                      tenetur suscipit unde repellendus officiis iusto est.
                    </p>
                    <span className="absolute inset-x-4 bottom-8 rounded-b-lg h-2 bg-gradient-to-r from-secondaryColor to-ChryslerBlue"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
