import { Link } from "react-router-dom";

const styles = {
  footer: {
    backgroundColor: "mainColor",
  },
};

function Footer() {
  return (
    <footer style={styles.footer} className="text-white py-6 bg-blackCustomBg">
      <div className="container mx-auto px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-6">
          {/* Company Info Column - Takes 2 columns */}
          <div className="md:col-span-2">
            {/* <svg className="w-48 h-8 mb-4" viewBox="0 0 240 40">
              <text
                x="0"
                y="25"
                style={{
                  fill: "white",
                  fontSize: "34px",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                }}
              >
                
              </text>
            </svg> */}
            {/* <img
              src="/images/logo.png"
              className="w-[8rem] h-[3rem] mb-2"
              alt="UIC Logo"
            /> */}
            <p className="text-[20px] font-semibold leading-[20px]">
              SHADE WAVE
              <span className="text-[30px]">.</span>
            </p>
            <br />
            {/* <p className="text-sm mb-4 leading-relaxed">
              We deal in all kind of Electronics & Engineering Apparatus &
              Accessories.
            </p> */}
            <div className="flex space-x-3"></div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-bold mb-3 text-sm">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Products
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}

          {/* Contact Column */}
          <div>
            <h3 className="font-bold mb-3 text-sm">Contact</h3>
            {/* <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:0329-6282733"
                  className="hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  0329-6282733
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@eespark.com"
                  className="hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  sales@eespark.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@eespark.com"
                  className="hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  eespark733@gmail.com
                </a>
              </li>
            </ul> */}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <div>
            Copyright ©{new Date().getFullYear()} Shade Wave. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
