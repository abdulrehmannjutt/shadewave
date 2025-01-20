const Categories = () => {
  const categories = [
    {
      title: "MEN",
      imageUrl:
        "https://media.ray-ban.com/cms/resource/image/1322682/portrait_ratio6x7/960/1120/4007098db00ec4670e5cf910b886cc1/E00BEAED449426CBD3144D1941361B93/rb-hp-buca-gender-man-d.jpg",
      imageUrl1:
        "https://media.ray-ban.com/cms/resource/image/1322672/landscape_ratio375x224/675/403/26a03bd150c1d6d612191156d9a81beb/7FEFCE651FF6F3EC279A933A7E490610/rb-hp-buca-gender-man-m.jpg",
      alt: "Men's Category",
    },
    {
      title: "WOMEN",
      imageUrl:
        "https://media.ray-ban.com/cms/resource/image/1322678/portrait_ratio6x7/960/1120/192de2fa6389eca586691f1ff60ef184/0D652DC3976D63C17B3EA267E651DAC1/rb-hp-buca-gender-woman-d.jpg",
      imageUrl1:
        "https://media.ray-ban.com/cms/resource/image/1322668/landscape_ratio375x224/675/403/b511984d29d5dacae2665230cfdd1f03/105650C0F0B01FD00BDBED13F529E4E7/rb-hp-buca-gender-woman-m.jpg",
      alt: "Women's Category",
    },
    {
      title: "KIDS",
      imageUrl:
        "https://media.ray-ban.com/cms/resource/image/1234760/portrait_ratio6x7/960/1120/5e74de9b95bd32e3d6d5b8bb1c143ed3/769844E9E81237E5B5F5B968D3B9D8D6/rb-hp-buca-gender-kids-d.jpg",
      imageUrl1:
        "https://media.ray-ban.com/cms/resource/image/1234782/landscape_ratio375x224/675/403/60ae5d7b064f1a8d97cbed13488e97e3/3DC25EDF2371D5E1D2A1409AC2B9F882/rb-hp-buca-gender-kids-m.jpg",
      alt: "Kids' Category",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="overflow-hidden">
                <div className="lg:flex hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.alt}
                    className="w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="lg:hidden flex flex-col">
                  <img
                    src={category.imageUrl1}
                    alt={category.alt}
                    className="w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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
