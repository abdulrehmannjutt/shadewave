import { useState, useEffect } from 'react';

function TopProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider images
  const slides = [
    { id: 1, img: '/images/slider1.jpeg' },
    { id: 2, img: '/images/slider2.jpeg' },
    { id: 3, img: '/images/slider3.jpeg' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="text-gray body-font bg-white">
      <div className="container px-5 py-10 mx-auto text-center ">
        <h2 className="text-5xl mb-10 font-medium text-blackCustom">
          Our Products
        </h2>

        {/* Slider starts here */}
        <div className="w-full h-5/6 relative mx-auto overflow-hidden rounded-lg shadow-md mb-10">
          <div className="w-full h-[80vh] flex justify-center items-center transition-all duration-500">
            <img src={slides[currentIndex].img} alt={`Slide ${currentIndex + 1}`} className="w-full h-full object-fill rounded-lg" />
          </div>

          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-mainColor bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            onClick={() => setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)}
          >
            ‹
          </button>
          <button 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-mainColor bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 w-full flex justify-center space-x-2">
            {slides.map((_, index) => (
              <span 
                key={index} 
                className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`} 
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        {/* Slider ends here */}

        {/* Product cards start here */}
        {/* <div className="flex flex-wrap -m-4">
          <HomeCards
            img="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            imgDimensions="h-[18rem] w-52 object-center"
          ></HomeCards>
          <HomeCards
            img="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
            imgDimensions="h-[16rem] w-56 object-center"
          ></HomeCards>
          <HomeCards
            img="https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
            imgDimensions="h-[16rem] w-52 object-center"
          ></HomeCards>
        </div>
        <div className="flex flex-wrap -m-4">
          <HomeCards
            img="https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
            imgDimensions="h-[16rem] w-64"
          ></HomeCards>
          <HomeCards
            img="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
            imgDimensions="h-[16rem] w-68 object-center"
          ></HomeCards>
          <HomeCards
            img="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
            imgDimensions="h-[18rem] w-48 object-cover object-center"
          ></HomeCards>
        </div> */}
        {/* Product cards end here */}
      </div>
    </section>
  );
}

export default TopProducts;
