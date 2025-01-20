import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "../components/Cart";
import LegalContactCard from "../components/OurContact";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    // Check if all fields are filled
    setIsFormValid(
      updatedFormData.name.trim() !== "" &&
        updatedFormData.email.trim() !== "" &&
        updatedFormData.message.trim() !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      toast.success("Sended");
    } else {
      toast.error("Please fill all the required fields.");
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative min-h-screen flex justify-center items-center">
        <ToastContainer />
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap justify-center">
          {/* <LegalContactCard /> */}

          <div className="p-5  bg-white flex flex-col sm:ml-[40px] w-full max-w-[448px] md:py-8 mt-8 sm:mt-0 rounded-lg">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Get in touch with us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-blueish focus:ring-2 focus:ring-blueish-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-blueish focus:ring-2 focus:ring-blueish-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-blueish focus:ring-2 focus:ring-blueish-50 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className={`text-white bg-mainColor border-0 py-2 px-6 focus:outline-none hover:bg-white hover:text-mainColor hover:border-[1px] hover:border-mainColor rounded text-lg ${
                  isFormValid ? "" : "cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <Cart />
      </section>
    </>
  );
}

export default Contact;
