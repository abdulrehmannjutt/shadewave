import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../redux/admin/adminSlice";
import { toast } from "react-toastify";
import { setIsProductsUpdate } from "../../redux/admin/adminSlice";
import { BACKEND_BASE_URL } from "../../constants/constants";

function Modal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.admin.modal);
  const selectedProduct = useSelector((state) => state.admin.selectedProduct);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image1: null,
    image2: null,
    image3: null,
    category: "",
    subCategory: "",
    description: "",
  });
  const [subCategories, setSubCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  // Reset form when modal closes
  useEffect(() => {
    if (!modal) {
      setFormData({
        name: "",
        price: "",
        image1: null,
        image2: null,
        image3: null,
        category: "",
        subCategory: "",
        description: "",
      });
    }
  }, [modal]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modal]);

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      dispatch(toggleModal());
    }
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = new FormData();

    // Format the inputs to capitalize the first letter
    submitData.append("name", capitalizeFirstLetter(formData.name));
    submitData.append("price", formData.price);
    submitData.append("category", capitalizeFirstLetter(formData.category));

    // Only append subCategory if it's selected
    if (formData.subCategory) {
      submitData.append(
        "subCategory",
        capitalizeFirstLetter(formData.subCategory)
      );
    }

    submitData.append(
      "description",
      formData.description.charAt(0).toUpperCase() +
        formData.description.slice(1)
    );

    if (formData.image1) submitData.append("image1", formData.image1);
    if (formData.image2) submitData.append("image2", formData.image2);
    if (formData.image3) submitData.append("image3", formData.image3);

    if (selectedProduct) {
      const res = await fetch(
        `${BACKEND_BASE_URL}admin/updateproduct/${selectedProduct._id}`,
        {
          method: "PATCH",
          body: submitData,
        }
      );

      if (res.status === 200) {
        dispatch(setIsProductsUpdate(true));
        toast.success("Product updated successfully!");
        dispatch(toggleModal());
      } else {
        toast.error("Failed to update product.");
      }
    } else {
      const res = await fetch(`${BACKEND_BASE_URL}admin/addproduct`, {
        method: "POST",
        body: submitData,
      });

      if (res.status === 201) {
        dispatch(setIsProductsUpdate(true));
        toast.success("Product Added");
        dispatch(toggleModal());
      } else if (res.status === 409) {
        toast.error("Product with this name already exists!");
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  const allCategoriesApi = async () => {
    const response = await fetch(`${BACKEND_BASE_URL}category/categories`);
    const data = await response.json();
    setAllCategories(data || []);
  };

  useEffect(() => {
    allCategoriesApi();
  }, []);

  useEffect(() => {
    if (modal && selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        price: selectedProduct.price || "",
        category: selectedProduct.category || "",
        subCategory: selectedProduct.subCategory || "",
        description: selectedProduct.description || "",
        image1: null,
        image2: null,
        image3: null,
      });

      const foundCategory = allCategories?.find(
        (cat) => cat.category === selectedProduct.category
      );
      setSubCategories(foundCategory ? foundCategory.subCategories : []);
    }
  }, [modal, selectedProduct, allCategories]);

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    const foundCategory = allCategories?.find(
      (cat) => cat.category === selectedCategoryName
    );
    setSubCategories(foundCategory ? foundCategory.subCategories : []);
    setFormData((prev) => ({
      ...prev,
      category: selectedCategoryName,
      subCategory: "",
    }));
  };

  return (
    <>
      {modal && (
        <div
          id="modal-background"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
          onClick={handleBackgroundClick}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedProduct ? "Edit Product" : "Add Product"}
                </h3>
                <button
                  onClick={() => dispatch(toggleModal())}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Rs 2999"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      min={0}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label
                        htmlFor="image1"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Image (required)
                      </label>
                      <input
                        type="file"
                        name="image1"
                        id="image1"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            image1: e.target.files[0],
                          }))
                        }
                        required={!selectedProduct}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="image2"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Image (optional)
                      </label>
                      <input
                        type="file"
                        name="image2"
                        id="image2"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            image2: e.target.files[0],
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="image3"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Image (optional)
                      </label>
                      <input
                        type="file"
                        name="image3"
                        id="image3"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            image3: e.target.files[0],
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Select category</option>
                      {allCategories?.map((cat, index) => (
                        <option key={index} value={cat.category}>
                          {cat.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Category (Optional)
                    </label>
                    <select
                      id="subcategory"
                      value={formData.subCategory}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subCategory: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select subcategory</option>
                      {subCategories?.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write product description here"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                {selectedProduct ? (
                  <button
                    type="submit"
                    className="text-green-700 border border-green-700 inline-flex items-center bg-primary-700 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Edit product
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-blueish border border-blueish inline-flex items-center hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add product
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
