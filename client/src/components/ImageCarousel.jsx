/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images, baseUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images?.map((image, index) => (
            <img
              key={index}
              src={`${baseUrl}admin/image/${image}`}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover object-center flex-shrink-0"
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus:outline-none"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 focus:outline-none"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
          {currentIndex + 1} / {images?.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4 flex gap-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="flex-shrink-0"
          >
            <img
              src={`${baseUrl}admin/image/${image}`}
              alt={`Thumbnail ${index + 1}`}
              className={`h-16 w-16 object-cover rounded-md ${
                currentIndex === index ? "opacity-100" : "opacity-50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
