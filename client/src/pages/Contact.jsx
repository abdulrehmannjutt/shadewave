import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Cart from "../components/Cart";
import { BACKEND_BASE_URL } from "../constants/constants";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    phone: Yup.string()
      .matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number format"
      )
      .transform((value) => (value === "" ? undefined : value)) // Transform empty string to undefined
      .optional(), // Mark as optional
    message: Yup.string().required("Message is required"),
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      // Validate single field
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error.message,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate all fields
      await validationSchema.validate(formData, { abortEarly: false });

      // If validation passes, send the data
      const response = await axios.post(
        `${BACKEND_BASE_URL}contact/sendemail`,
        formData
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send the message. Please try again.");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Handle validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
        toast.error("Please fix the form errors.");
      } else {
        // Handle API errors
        console.error("Error sending message:", error);
        toast.error("An error occurred while sending the message.");
      }
    }
  };

  const getInputClassName = (fieldName) => `
    w-full bg-white rounded border 
    ${errors[fieldName] ? "border-red-500" : "border-gray-300"}  
    text-base outline-none text-gray-700 py-1 px-3 leading-8 
    transition-colors duration-200 ease-in-out
  `;

  return (
    <>
      <section className="text-gray-600 body-font relative min-h-screen flex justify-center items-center">
        <ToastContainer />
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap justify-center">
          <div className="p-4 bg-white flex flex-col sm:ml-[40px] w-full max-w-[448px] mt-8 sm:mt-0 rounded-lg shadow-lg border">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Get in touch with us
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClassName("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClassName("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getInputClassName("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${getInputClassName("message")} h-32 resize-none`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  !(formData.name && formData.email && formData.message)
                }
                className={`text-white bg-mainColor py-2 px-6 focus:outline-none 
    ${
      formData.name && formData.email && formData.message
        ? "hover:bg-white hover:text-mainColor border-[1px] hover:border-mainColor"
        : "opacity-50 cursor-auto"
    } 
    rounded text-lg`}
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
