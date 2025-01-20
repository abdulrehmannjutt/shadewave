import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { setCategories } from "../../redux/admin/adminSlice";
import { BACKEND_BASE_URL } from "../../constants/constants";
import DeleteModal from "./DeleteModal";
import {
  toggleDeleteProductModal,
  setSelectedProduct,
} from "../../redux/admin/adminSlice";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.admin.categories);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoriesUpdated, setIsCategoriesUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const isProductsUpdate = useSelector((state) => state.admin.isProductsUpdate);
  const topRef = useRef(null);

  const allCategoriesApi = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_BASE_URL}category/categories`);
    if(response.status === 204) setLoading(false);
    const data = await response.json();
    dispatch(setCategories(data || []));
    setLoading(false);
  };

  useEffect(() => {
    allCategoriesApi();
  }, [isCategoriesUpdated, isProductsUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCategory) {
      const subCategoriesArray = subCategories
        .split(",")
        .map((item) => item.trim());

      const res = await fetch(
        `${BACKEND_BASE_URL}category/updatecategory/${selectedCategory?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            subCategories: subCategoriesArray,
          }),
        }
      );
      if (res.status === 200) {
        const updatedCategory = await res.json();
        dispatch(
          setCategories(
            allCategories.map((cat) =>
              cat._id === selectedCategory._id ? updatedCategory : cat
            )
          )
        );
        toast.success("Category Updated");
      } else if (res.status === 404) {
        toast.error("Category with this name does not exist!");
      } else {
        toast.error("Failed to update category");
      }
    } else {
      // Split the subCategories string into an array
      const subCategoriesArray = subCategories
        .split(",")
        .map((item) => item.trim());

      const res = await fetch(`${BACKEND_BASE_URL}category/addcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          subCategories: subCategoriesArray,
        }),
      });

      if (res.status === 201) {
        toast.success("Category Added");
        setIsCategoriesUpdate(true);
      } else if (res.status === 409) {
        toast.error("Category with this name already exist!");
      } else {
        toast.error("Failed to add category");
      }
    }
  };

  return (
    <section className="min-h-screen">
      <form onSubmit={handleSubmit} ref={topRef}>
        <div className="flex flex-wrap gap-4 mb-4 items-end px-[16px]">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Sub Category (comma-separated)
            </label>
            <input
              type="text"
              name="subCategories"
              id="subcategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type subcategories (PC, Tabs)"
              value={subCategories}
              onChange={(e) => setSubCategories(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${
              selectedCategory
                ? "text-green-700 border border-green-700"
                : "text-blueish border border-blueish"
            } inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          >
            {selectedCategory ? "Edit Category" : "Add Category"}
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                Sr No
              </th>
              <th scope="col" className="px-4 py-4">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Sub Category
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <tr>
                <td colSpan="5">
                  <div className="flex justify-center items-center h-full">
                    <TailSpin
                      visible={true}
                      height="100"
                      width="100"
                      color="#007BC4"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                    />
                  </div>
                </td>
              </tr>
            ) : !allCategories?.length ? (
              <tr>
                <td className="py-5 px-5">You dont have any categories yet.</td>
              </tr>
            ) : (
              allCategories.map((category, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 uppercase">{index + 1}</td>
                  <td className="px-4 py-3">{category.category}</td>
                  <td className="px-4 py-3 ">
                    {category.subCategories.map((subCategory, index) => (
                      <div key={index}>{subCategory}</div>
                    ))}
                  </td>

                  <td className="py-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setSelectedCategory(category);
                        setCategory(category.category);
                        setSubCategories(category.subCategories.join(", "));
                      }}
                      className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        dispatch(toggleDeleteProductModal());
                        dispatch(setSelectedProduct(category));
                      }}
                      type="button"
                      className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          fill="currentColor"
                          d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DeleteModal url="category/deletecategory/" />
    </section>
  );
};

export default CategoryTable;
