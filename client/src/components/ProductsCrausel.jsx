/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { BACKEND_BASE_URL } from "../constants/constants";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsCrausel = ({ products, heading, loading }) => {
  const sliderRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef(null);

  const isManualScrollingRef = useRef(false);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);

      // If we've reached the end, reset to start for continuous scrolling
      if (
        scrollLeft >= scrollWidth - clientWidth - 1 &&
        isAutoScrolling &&
        !isManualScrollingRef.current
      ) {
        sliderRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const observer = new ResizeObserver(checkScrollButtons);
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }
    return () => observer.disconnect();
  }, [products]);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (sliderRef.current && isAutoScrolling) {
        const scrollAmount = 280; // Width of one card
        const currentScroll = sliderRef.current.scrollLeft;
        sliderRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    };

    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(startAutoScroll, 3000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  const scroll = (direction) => {
    setIsAutoScrolling(false); // Stop auto-scroll on manual navigation
    isManualScrollingRef.current = true; // Set manual scrolling flag

    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });

      // Reset the manual scrolling flag after the scroll animation completes
      setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 5000); // Adjust timing based on your scroll animation duration
    }
  };

  const handleScroll = () => {
    checkScrollButtons();
  };

  return (
    <section>
      {loading === false ? (
        <h1 className="uppercase sm:text-[60px] text-[30px] text-center text-blackCustom">
          {heading}
        </h1>
      ) : (
        ""
      )}

      <div className="relative max-w-screen-2xl mx-auto">
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-2 scroll-smooth hide-scrollbar"
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products?.map((product, index) => (
            <div key={index} className="flex-none w-[280px]">
              <ProductCard
                productId={product._id}
                img={`${BACKEND_BASE_URL}admin/image/${product.images[0]}`}
                imgDimensions="h-[300px] object-cover"
                title={product.name}
                paragraph={product.description}
                price={product.price}
                bgColor={product.bgColor}
                category={product.category}
                subCategory={product.subCategory}
                images={product?.images}
              />
            </div>
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
};

export default ProductsCrausel;
