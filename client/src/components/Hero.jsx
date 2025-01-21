import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative w-full max-w-screen-2xl mx-auto">
      {/* Hero Image Container - 60vh on mobile, natural height on desktop */}
      <div className="relative sm:h-auto h-[60vh]">
        <img
          src="/images/Ray-Ban-model-couple1.jpg"
          // src="/images/hero.webp"
          alt="People wearing stylish glasses"
          className="w-full h-full sm:h-auto object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

        {/* Content - Positioned absolute within image container */}
        <div className="absolute bottom-0 right-0 text-white px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Hero Text */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl"
              >
                See the World in Style
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base sm:text-xl max-w-2xl"
              >
                Discover our collection of premium eyewear that combines fashion
                with function
              </motion.p>

              {/* Shop Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="bg-white text-black 
                           px-5 sm:px-8 
                           py-2 sm:py-3 
                           text-sm sm:text-lg 
                           rounded-full font-semibold 
                           hover:bg-opacity-90 transition-colors duration-300
                           mt-3 sm:mt-6"
              >
                Shop Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
