import { useState, useEffect } from "react";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, img: "/images/slider2.png" },
    { id: 2, img: "/images/slider1.png" },
    { id: 3, img: "/images/slider3.png" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="mt-20 w-[90%] h-5/6 relative mx-auto overflow-hidden rounded-lg transition-shadow ">
      <div className="flex justify-center items-center transition-all duration-500 bg-white">
        <img
          src={slides[currentIndex].img}
          alt={`Slide ${currentIndex + 1}`}
          className="object-center object-fill rounded-lg"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[40px] bg-opacity-50 text-blackCustom p-2 rounded-full hover:bg-opacity-70 transition"
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? slides.length - 1 : currentIndex - 1
          )
        }
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 text-blackCustom text-[40px] p-2 rounded-full hover:bg-opacity-70 transition"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-mainColor" : "bg-blackCustom"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

// Main Hero Component
function Hero() {
  return (
    <div>
     
      <div className="flex h-[80vh] items-center justify-center space-x-4 px-4 bg-white">
        <Slider />
      </div>
    </div>
  );
}

export default Hero;
