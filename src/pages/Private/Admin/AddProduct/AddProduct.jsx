import { RiDraftLine } from "react-icons/ri";
import { GoCheck } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlinePercentage } from "react-icons/ai";

import JoditEditor from "jodit-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductImageUpload from "../../../../components/Admin/ProductImageUpload";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import CategoryUpdateModal from "../../../../components/Admin/CategoryUpdateModal";
import useGetCategories from "../../../../hooks/useGetCategories";
import axios from "axios";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  // AXIOS
  const axiosSecure = useAxiosSecure();

  // LOADING STATE
  const [addingProductLoading, setAddingProductLoading] = useState(false);

  // PRODUCT NAME STATE
  const [name, setName] = useState("");

  // JODIT (PRODUCT DESCRIPTION) STATE
  const [content, setContent] = useState("");
  const handleContentChange = (value) => {
    setContent(value);
  };

  // SIZE STATE
  const [sizes, setSizes] = useState([]);
  const handleUpdateSize = (value) => {
    if (!sizes.includes(value)) {
      setSizes([...sizes, value]);
    } else {
      setSizes(sizes.filter((size) => size !== value));
    }
  };

  // GENDER STATE
  const [gender, setGender] = useState("");

  // COLOR STATE
  const [color, setColor] = useState("");

  // FEATURE STATE
  const [featured, setFeatured] = useState(false);

  //   PRICING STATE
  const [price, setPrice] = useState("0");
  //   STOCK STATE
  const [stock, setStock] = useState(0);
  //   DISCOUNT STATE
  const [discount, setDiscount] = useState(0);

  // PRODUCT CATEGORY
  const [category, setCategory] = useState("");
  const { categories } = useGetCategories();

  //   IMAGE URLS STATE
  const [imageURLs, setImageURls] = useState([]);
  const uploadImagesToImgBB = async (imageList) => {
    try {
      const imgBBUrls = [];

      for (const image of imageList) {
        const imageData = image.data_url.split(",")[1];
        const response = await axios.post(
          image_hosting_api,
          { image: imageData },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imgBBUrls.push({ data_url: response.data.data.url });
      }
      return imgBBUrls;
    } catch (error) {
      console.error("Error uploading images to ImgBB:", error);
      throw error; // Rethrow the error to handle it outside of this function
    }
  };

  //   HANDLE ADD PRODUCT
  const handleAddProduct = async () => {
    if (name === "") {
      toast.error("Product Name Required");
      return;
    }
    if (content === "") {
      toast.error("Product Description Required");
      return;
    }
    if (gender === "") {
      toast.error("Product Gender Required");
      return;
    }
    if (color === "") {
      toast.error("Product Color Required");
      return;
    }

    if (price === "0") {
      toast.error("Price Is Required");
      return;
    }
    if (category === "") {
      toast.error("Product Category Required");
      return;
    }
    if (imageURLs.length === 0) {
      toast.error("At least one image required");
      return;
    }

    setAddingProductLoading(true);
    // AFTER ALL IMAGE UPDATE
    const imgBBUrls = await uploadImagesToImgBB(imageURLs);

    const data = {
      name: name.trim(),
      description: content,
      sizes,
      gender,
      color: color.trim(),
      price,
      category,
      stock,
      discount,
      imageURLs: imgBBUrls,
      featured,
    };

    axiosSecure.post("/manage/add-product", { data }).then((res) => {
      if (res.data.insertedId) {
        toast.success("Product Added!");
        setName("");
        setContent("");
        setSizes([]);
        setGender("");
        setPrice("0");
        setStock(0);
        setDiscount(0);
        setCategory("");
        setImageURls([]);
        setColor("");
        setFeatured(false);
        setAddingProductLoading(false);
      } else {
        toast.error("Error Occurred");
        setAddingProductLoading(false);
      }
    });
  };

  return (
    <div className="min-h-full h-full">
      {/* ADD PRODUCT FORM */}
      <div className="flex gap-4 flex-col xl:flex-row">
        {/* PRODUCT INFO */}
        <div className="flex-1 gap-4 flex flex-col">
          {/* NAME/DESC/SIZE/GENDER */}
          <div className="bg-[#F9F9F9] p-4 rounded-lg">
            <h1 className="text-2xl font-bold mb-2">General Information</h1>
            {/* NAME */}
            <div className="w-full space-y-3 text-lg mb-4">
              <h1 className="font-medium">Product Name</h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full bg-[#EEEEEE] rounded-lg py-2 px-3"
                placeholder="Product Name"
              />
            </div>
            {/* DESC */}
            <div className="w-full space-y-3 text-lg mb-4">
              <h1 className="font-medium">Product Description</h1>
              <JoditEditor
                id="content"
                value={content}
                onBlur={handleContentChange}
                config={{
                  readonly: false,
                  showCharsCounter: false,
                }}
              />
            </div>
            {/* SIZE/GENDER/COLOR/FEATURED */}
            <div className="flex flex-col md:flex-row gap-y-2 gap-x-4  ">
              {/* SIZE */}
              <div className="w-full max-w-sm space-y-3 text-lg">
                <h1 className="font-medium">Size</h1>
                <div className="flex gap-1 flex-wrap">
                  {/* NONE */}
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.length === 0 && "bg-[#272727] text-background"
                    }`}
                    onClick={() => setSizes([])}
                  >
                    NONE
                  </button>
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.includes("XS") && "bg-[#272727] text-background"
                    }`}
                    onClick={() => handleUpdateSize("XS")}
                  >
                    XS
                  </button>
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.includes("S") && "bg-[#272727] text-background"
                    }`}
                    onClick={() => handleUpdateSize("S")}
                  >
                    S
                  </button>
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.includes("M") && "bg-[#272727] text-background"
                    }`}
                    onClick={() => handleUpdateSize("M")}
                  >
                    M
                  </button>
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.includes("XL") && "bg-[#272727] text-background"
                    }`}
                    onClick={() => handleUpdateSize("XL")}
                  >
                    XL
                  </button>
                  <button
                    className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                      sizes.includes("XXL") && "bg-[#272727] text-background"
                    }`}
                    onClick={() => handleUpdateSize("XXL")}
                  >
                    XXL
                  </button>
                </div>
              </div>
              {/* GENDER */}
              <div className="space-y-3 text-lg flex flex-col">
                <h1 className="font-medium">Gender</h1>
                <div className="flex items-center flex-1 gap-x-4 gap-y-4 flex-wrap justify-between">
                  {/* MEN */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      checked={gender === "Men"}
                      onClick={() => setGender("Men")}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Men
                    </label>
                  </div>
                  {/* WOMEN */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      checked={gender === "Women"}
                      onClick={() => setGender("Women")}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Women
                    </label>
                  </div>
                  {/* UNISEX */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio"
                      checked={gender === "Unisex"}
                      onClick={() => setGender("Unisex")}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Unisex
                    </label>
                  </div>
                </div>
              </div>
              {/* COLOR / FEATURED */}
              <div className="w-full space-y-3 text-lg">
                <h1 className="font-medium">Featured</h1>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="radio-2"
                    className="radio"
                    checked={featured}
                    onClick={() => setFeatured(!featured)}
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Show on Homepage
                  </label>
                </div>
                <h1 className="font-medium">Product Colors</h1>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  className="w-full bg-[#EEEEEE] rounded-lg py-2 px-3"
                  placeholder="Separate with spaces.."
                />
              </div>
            </div>
          </div>
          {/* PRICING AND STOCK */}
          <div className="bg-[#F9F9F9] p-4 rounded-lg flex-1">
            <h1 className="text-2xl font-bold mb-2">Pricing And Stock</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* PRICE */}
              <div>
                <h1 className="font-medium mb-2">Pricing</h1>
                <div className="relative">
                  <FiDollarSign className="absolute top-3 left-3"></FiDollarSign>
                  <input
                    onChange={(e) => {
                      let value = e.target.value.trim();
                      value = value.replace(/^0+/, ""); // Remove leading zeros
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        setPrice(value || "0");
                      } else {
                        toast.error("Invalid Price");
                      }
                    }}
                    value={price}
                    type="text"
                    className="w-full bg-[#EEEEEE] rounded-lg pl-9 py-2"
                  />
                </div>
              </div>
              {/* STOCK */}
              <div>
                <h1 className="font-medium mb-2">Stock</h1>
                <div className="relative">
                  <MdOutlineInventory2 className="absolute top-3 left-3"></MdOutlineInventory2>
                  <input
                    onChange={(e) => {
                      let value = e.target.value.trim();
                      value = value.replace(/^0+/, "");
                      if (value === "" || /^\d+$/.test(value)) {
                        setStock(parseInt(value) || 0);
                      } else {
                        toast.error("Invalid Stock");
                      }
                    }}
                    value={stock}
                    type="text"
                    pattern="\d*"
                    className="w-full bg-[#EEEEEE] rounded-lg pl-9 py-2"
                  />
                </div>
              </div>
              {/* DISCOUNT */}
              <div>
                <h1 className="font-medium mb-2">Discount</h1>
                <div className="relative">
                  <AiOutlinePercentage className="absolute top-3 left-3"></AiOutlinePercentage>
                  <input
                    onChange={(e) => {
                      let value = e.target.value.trim();
                      value = value.replace(/^0+/, ""); //
                      if (
                        value === "" ||
                        (/^\d+$/.test(value) &&
                          parseInt(value) >= 0 &&
                          parseInt(value) <= 100)
                      ) {
                        setDiscount(parseInt(value) || 0); //
                      } else {
                        toast.error("Invalid Stock");
                      }
                    }}
                    value={discount}
                    type="text"
                    pattern="\d*"
                    className="w-full bg-[#EEEEEE] rounded-lg pl-9 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PRODUCT IMAGES AND CATEGORY */}
        <div className="xl:max-w-xl w-full">
          {/* IMAGE UPLOAD */}
          <div className="flex flex-col gap-y-2 h-full">
            <div className="mb-2 bg-[#F9F9F9] p-4 rounded-lg">
              <h1 className="text-2xl font-bold mb-2">Product Category</h1>
              <div className="flex items-center flex-col md:flex-row gap-2">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  defaultValue={category}
                  className="select w-full focus:outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 uppercase"
                >
                  <option disabled value={""}>
                    Pick Category
                  </option>
                  {categories.length > 0 && (
                    <>
                      {categories.map((cat) => (
                        <option
                          key={cat._id}
                          value={cat.category}
                          className="uppercase"
                        >
                          {cat.category}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <button
                  onClick={() =>
                    document.getElementById("category-modal").showModal()
                  }
                  className="btn bg-green-300 border-green-300 hover:bg-green-400 hover:borer-green-400 w-full md:w-fit"
                >
                  + Add New Category
                </button>
              </div>
            </div>
            <div className="bg-[#F9F9F9] p-4 rounded-lg flex-1">
              <h1 className="text-2xl font-bold mb-2">Upload Images</h1>
              <ProductImageUpload
                imageURLs={imageURLs}
                setImageURls={setImageURls}
              ></ProductImageUpload>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="gap-3 max-w-lg mx-auto flex mt-4">
        {/* SAVE DRAFT BUTTON */}
        <button className="btn flex-1 bg-transparent rounded-full border-primary hover:border-primary hover:bg-primary hover:text-white flex-nowrap whitespace-nowrap">
          <RiDraftLine className="text-lg"></RiDraftLine>Save Draft
        </button>
        {/* ADD PRODUCT BUTTON */}
        <button
          onClick={() => handleAddProduct()}
          disabled={addingProductLoading}
          className="btn flex-1 rounded-full border-green-300 bg-green-300 hover:bg-green-400 hover:border-400 flex-nowrap whitespace-nowrap"
        >
          {addingProductLoading ? (
            <>
              <span className="loading loading-spinner loading-md"></span>
            </>
          ) : (
            <>
              <GoCheck className="text-xl"></GoCheck>Add Product
            </>
          )}
        </button>
      </div>
      {/* MODAL */}
      <CategoryUpdateModal></CategoryUpdateModal>
    </div>
  );
};

export default AddProduct;
