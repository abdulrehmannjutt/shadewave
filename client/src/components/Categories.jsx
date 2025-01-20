import React from "react";

const Categories = () => {
  const categories = [
    {
      title: "MEN",
      imageUrl: "/api/placeholder/600/800",
      alt: "Men's Category",
    },
    {
      title: "WOMEN",
      imageUrl: "/api/placeholder/600/800",
      alt: "Women's Category",
    },
    {
      title: "KIDS",
      imageUrl: "/api/placeholder/600/800",
      alt: "Kids' Category",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.alt}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay with text */}
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <h2 className="text-white text-2xl md:text-3xl font-bold p-6 w-full">
                  {category.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
