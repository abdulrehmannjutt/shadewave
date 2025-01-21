import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const headerTextClasses =
    "font-medium 950:text-[16px] text-[14px] border-b-2 border-transparent transition-all duration-300 ease-in-out uppercase";
  const activeClasses =
    "text-mainColor hover:border-b-2 hover:border-mainColor";
  const notActiveClasses = "text-white hover:border-b-2 hover:border-white";
  return (
    <footer className="text-white py-6 px-5 bg-blackCustomBg">
      <div className="mx-auto max-w-screen-2xl">
        {/* Main Footer Content */}
        <div className="flex 950:flex-row flex-col flex-wrap 950:gap-32 gap-4 justify-between">
          <div className="flex flex-wrap sm:justify-center sm:gap-40 justify-between">
            <div>
              <p className="sm:text-[30px] text-[20px] font-semibold">
                SHADE WAVE
                <span className="text-[30px]">.</span>
              </p>
              <p className="sm:text-[20px] text-[16px] font-semibold">
                See the World in Style
                <span className="text-[30px]">.</span>
              </p>
            </div>
            <div className="950:hidden flex flex-col gap-1 sm:mt-0 mt-[10px]">
              <p className="font-bold sm:text-[24px] text-[18px]">Contact</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="tel:0345-6502924"
                    className="hover:underline flex items-center sm:text-[15px] text-[11.5px]"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    0345-6502924
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:shadewave48@gmail.com"
                    className="hover:underline flex items-center sm:text-[15px] text-[11.5px]"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    shadewave48@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact Column */}
          <div className="950:flex hidden flex-col gap-1">
            <p className="font-bold sm:text-[24px] text-[20px]">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:0345-6502924"
                  className="hover:underline flex items-center text-[15px]"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  0345-6502924
                </a>
              </li>
              <li>
                <a
                  href="mailto:shadewave48@gmail.com"
                  className="hover:underline flex items-center text-[15px]"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  shadewave48@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 mt-1 950:border-none border-t border-white 950:pt-0 pt-5">
            <div className="flex gap-6 950:justify-start justify-center">
              <Link
                to="/"
                className={`${headerTextClasses} ${
                  isActive("/") ? `${activeClasses}` : `${notActiveClasses}`
                }`}
              >
                Home
              </Link>

              <Link
                to="/contact"
                className={`${headerTextClasses} ${
                  isActive("/contact")
                    ? `${activeClasses}`
                    : `${notActiveClasses}`
                }`}
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className={`${headerTextClasses} ${
                  isActive("/about")
                    ? `${activeClasses}`
                    : `${notActiveClasses}`
                }`}
              >
                About Us
              </Link>
            </div>
            <p className="950:text-md text-sm 950:text-right text-center">
              Copyright ©{new Date().getFullYear()} Shade Wave. All Rights
              Reserved.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        {/* <div className="border-t border-white pt-4 950:hidden flex justify-center items-center text-sm">
          Copyright ©{new Date().getFullYear()} Shade Wave. All Rights Reserved.
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
