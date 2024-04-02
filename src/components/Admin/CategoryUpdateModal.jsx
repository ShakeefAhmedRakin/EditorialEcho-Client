import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCategories from "../../hooks/useGetCategories";
import { MdDelete } from "react-icons/md";

const CategoryUpdateModal = () => {
  const [addInfo, setaddInfo] = useState("");

  const axiosSecure = useAxiosSecure();
  const { categories, refetchCategories } = useGetCategories();

  // HANDLE CATEGORY ADD
  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    const category = e.target.cat.value.trim().toLowerCase();
    if (category === "") {
      return;
    } else {
      axiosSecure
        .post("/manage/add-category", { category })
        .then(() => {
          e.target.cat.value = "";
          setaddInfo("Added Successfully");
          setTimeout(() => setaddInfo(""), 3000);
          refetchCategories();
        })
        .catch((err) => {
          e.target.cat.value = "";
          setaddInfo(err.response.data.message);
          setTimeout(() => setaddInfo(""), 3000);
        });
    }
  };

  // HANDLE CATEGORY DELETE
  const handleDeleteCategory = async (id) => {
    axiosSecure.delete(`/manage/delete-category/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetchCategories();
      }
    });
  };

  return (
    <>
      {/* CATEGORY ADD FORM */}
      <dialog id="category-modal" className="modal">
        <div className="modal-box rounded-md flex flex-col">
          <h3 className="font-bold text-xl mb-2">Product Categories</h3>
          <hr className="mb-2" />
          <div className="flex gap-2 items-center mb-2">
            <h2 className="font-medium">Add Category</h2>
            {addInfo && (
              <span
                className={`text-xs font-medium ${
                  addInfo === "Added Successfully"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {addInfo}
              </span>
            )}
          </div>
          <form onSubmit={handleCategoryAdd} className="flex items-center">
            <input
              type="text"
              name="cat"
              placeholder="Category Name"
              className="w-full bg-[#EEEEEE] rounded-lg h-[48px] px-4 rounded-r-none focus:outline-none"
              pattern="[A-Za-z][A-Za-z\s]*"
              title="Please enter alphabetic characters only"
            />
            <button
              type="submit"
              className="btn rounded-l-none bg-green-400 border-none text-lg hover:bg-green-500"
            >
              +
            </button>
          </form>
          <h2 className="font-medium my-2">All Categories</h2>
          <div className="h-48 overflow-y-auto space-y-2 shadow-sm">
            {categories.length > 0 ? (
              <>
                {categories
                  .slice()
                  .reverse()
                  .map((cat) => (
                    <div
                      key={cat._id}
                      className="flex justify-between border border-gray-500 rounded-lg py-2 pl-3 pr-2"
                    >
                      <h1 className="uppercase font-semibold">
                        {cat.category}
                      </h1>
                      <button
                        onClick={() => handleDeleteCategory(cat._id)}
                        className="text-red-500 hover:text-600 duration-300 text-xl"
                      >
                        <MdDelete></MdDelete>
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <>
                <h1 className="h-full flex items-center justify-center text-red-500">
                  No Categories
                </h1>
              </>
            )}
          </div>
          <div className="modal-action flex justify-center">
            <form method="dialog">
              <button className="btn border-primary text-primary bg-transparent hover:bg-primary hover:text-background hover:border-primary">
                Close
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CategoryUpdateModal;
