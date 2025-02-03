import Cart from "../components/Cart";
const About = () => {
  return (
    <section className="text-gray-600 body-font min-h-screen flex justify-center items-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline-block w-8 h-8 text-gray-400 mb-8"
            viewBox="0 0 975.036 975.036"
          >
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
          </svg>
          <p className="leading-relaxed text-lg">
            Welcome to Shade Wave, your go-to destination for premium eyewear
            that blends style, comfort, and functionality. We believe that the
            right pair of glasses is more than just an accessory—it&#39;s a
            statement of personality, a tool for clarity, and a reflection of
            confidence. At Shade Wave, we are committed to offering a diverse
            range of high-quality eyeglasses, from timeless classics to modern
            trends, ensuring there&#39;s a perfect fit for everyone. Whether
            you&#39;re looking for prescription glasses, blue light protection,
            or fashionable sunglasses, we provide expertly crafted frames and
            lenses tailored to your needs. Founded with a passion for vision
            care and style, our mission is to enhance your everyday life with
            eyewear that not only improves sight but also elevates your look.
            With a seamless shopping experience, expert guidance, and a
            dedication to customer satisfaction, we strive to help you see the
            world with clarity and confidence.
          </p>
          <span className="inline-block h-1 w-10 rounded bg-blueish mt-8 mb-6" />
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
            Shade Wave
          </h2>
          <p className="text-gray-500">
            Join us in redefining eyewear—because great vision deserves great
            style!
          </p>
        </div>
      </div>

      <Cart />
    </section>
  );
};

export default About;
