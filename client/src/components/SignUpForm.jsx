import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants/constants";


function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/products");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await fetch(`${BACKEND_BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    let data = await res.json();

    if (res.status === 201) {
      localStorage.setItem('userData', JSON.stringify(data))
      navigate("/products");
      
    }

    if (res.status === 400 && data.errors) {
      setFormErrors(data.errors);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="relative py-3 sm:max-w-xs sm:mx-auto">
          <div className="bg-white px-10 py-10 w-96 rounded-lg shadow-lg shadow-mainColor/50">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <p className="uppercase flex justify-center font-bold mb-8 text-mainColor text-[24px]">
                  Signup
                </p>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Wick"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-sm-light"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.includes("Name can only contain letters") && (
                  <p className="text-red-600 text-sm mt-1">
                    Name can only contain letters
                  </p>
                )}
                {formErrors.includes("Name is required") && (
                  <p className="text-red-600 text-sm mt-1">Name is required</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-sm-light"
                  placeholder="name@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.includes("Invalid email format") && (
                  <p className="text-red-600 text-sm mt-1">
                    Invalid email format
                  </p>
                )}
                {formErrors.includes("Email is required") && (
                  <p className="text-red-600 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainColor focus:border-mainColor block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mainColor dark:focus:border-mainColor dark:shadow-sm-light"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                
                {formErrors.includes(
                  "Password must be at least 8 characters"
                ) && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must be at least 8 characters
                  </p>
                )}
                {formErrors.includes(
                  "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
                ) && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character
                  </p>
                )}
                
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-mainColor hover:bg-white hover:text-mainColor hover:border hover:border-mainColor font-medium rounded-lg text-sm px-5 py-2.5 text-center transition ease-in duration-200"
                >
                  Register new account
                </button>
              </div>
            </form>
            <div className="mt-5 flex justify-center items-center">
              <p>
                already hanve an account?
                <span
                  onClick={() => navigate("/login")}
                  className="ml-3 cursor-pointer text-mainColor font-semibold underline-offset-4"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
