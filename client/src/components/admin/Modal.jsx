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
  const [name, setName] = useState("");
  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [modal]);

  // Close modal when clicking on the background
  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      dispatch(toggleModal());
    }
  };

  // add product
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedProduct) {
      // Update product

      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", selectedSubCategory);
      formData.append("description", description);
      formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);

      const res = await fetch(
        `${BACKEND_BASE_URL}admin/updateproduct/${selectedProduct._id}`,
        {
          method: "PATCH",
          body: formData,
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
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", selectedSubCategory);
      formData.append("description", description);
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);

      const res = await fetch(`${BACKEND_BASE_URL}admin/addproduct`, {
        method: "POST",
        body: formData,
      });

      if (res.status === 201) {
        dispatch(setIsProductsUpdate(true));

        toast.success("Product Added");
        dispatch(toggleModal());
      } else if (res.status === 409) {
        toast.error("Product with this name already exist!");
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
      setName(selectedProduct.name || "");
      setPrice(selectedProduct.price || "");
      setCategory(selectedProduct.category || "");
      setSubCategories(selectedProduct.subCategories || []);
      setSelectedSubCategory(selectedProduct.subCategory || "");
      setDescription(selectedProduct.description || "");
    }
  }, [modal, selectedProduct]);

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    setCategory(selectedCategoryName);
    const foundCategory = allCategories?.find(
      (cat) => cat.category === selectedCategoryName
    );
    setSubCategories(foundCategory ? foundCategory.subCategories : []);
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
            {/* Modal content */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* Modal header */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                {selectedProduct ? (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit Product
                  </h3>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Product
                  </h3>
                )}
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
              {/* Modal body */}
              <form
                onSubmit={handleSubmit}
                action="/addproduct"
                method="POST"
                encType="multipart/form-data"
              >
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                        onChange={(e) => setImage1(e.target.files[0])}
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
                        onChange={(e) => setImage2(e.target.files[0])}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Image (optional)
                      </label>
                      <input
                        type="file"
                        name="image3"
                        id="image3"
                        onChange={(e) => setImage3(e.target.files[0])}
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
                      value={category}
                      onChange={handleCategoryChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option>Select category</option>
                      {allCategories?.map((cat, index) => (
                        <option key={index} value={cat.category}>
                          {cat.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Category
                    </label>
                    <select
                      id="category"
                      value={subCategories}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option>Select subcategory</option>
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
                      defaultValue={""}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                {selectedProduct ? (
                  <button
                    type="submit"
                    className="text-green-700 border border-green-700 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Edit product
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-blueish border border-blueish inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
