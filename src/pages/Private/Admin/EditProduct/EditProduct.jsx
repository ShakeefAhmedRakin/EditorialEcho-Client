import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import CategoryUpdateModal from "../../../../components/Admin/CategoryUpdateModal";
import useGetCategories from "../../../../hooks/useGetCategories";
import JoditEditor from "jodit-react";
import { RiDraftLine } from "react-icons/ri";
import { GoCheck } from "react-icons/go";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlinePercentage } from "react-icons/ai";
import ProductImageUpload from "../../../../components/Admin/ProductImageUpload";
import { toast } from "sonner";
import { uploadImagesToImgBB } from "../../../../utils/uploadImagesToImgBB";

const EditProduct = () => {
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

  // TYPE STATE
  const [type, setType] = useState("");

  // COLOR STATE
  const [color, setColor] = useState("");

  // FEATURE STATE
  const [featured, setFeatured] = useState(false);

  //   PRICING STATE
  const [price, setPrice] = useState("0");
  // COST STATE
  const [cost, setCost] = useState("0");

  //   STOCK STATE
  const [stock, setStock] = useState(0);
  //   DISCOUNT STATE
  const [discount, setDiscount] = useState(0);

  // PRODUCT CATEGORY
  const [category, setCategory] = useState("");
  const { categories } = useGetCategories();

  //   IMAGE URLS STATE
  const [imageURLs, setImageURls] = useState([]);

  // DRAFT STATE
  const [draft, setDraft] = useState(false);

  //   BUTTON LOADER STATES
  const [updateProductLoading, setUpdateProductLoading] = useState(false);
  const [makeDraftLoading, setMakeDraftLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  // FETCHING PRODUCT DATA
  const axiosSecure = useAxiosSecure();
  const [refetchData, setRefetchData] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setFetchingData(true);
    axiosSecure.get(`/manage/get-product?id=${id}`).then((res) => {
      const productDetails = res.data;
      setName(productDetails.name);
      setContent(productDetails.description);
      setSizes(productDetails.sizes);
      setGender(productDetails.gender);
      setFeatured(productDetails.featured);
      setType(productDetails.type);
      setColor(productDetails.color);
      setCategory(productDetails.category);
      setPrice(productDetails.price);
      setCost(productDetails.cost);
      setStock(productDetails.stock);
      setDiscount(productDetails.discount);
      setImageURls(productDetails.imageURLs);
      setDraft(productDetails.draft);
      setFetchingData(false);
      setRefetchData(false);
    });
  }, [axiosSecure, id, refetchData]);

  //   HANDLE UPDATE PRODUCT
  const handleUpdateProduct = async () => {
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

    if (type === "") {
      toast.error("Product Type Required");
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

    setUpdateProductLoading(true);
    // AFTER ALL IMAGE UPDATE
    const imgBBUrls = await uploadImagesToImgBB(imageURLs);

    const data = {
      name: name.trim(),
      description: content,
      sizes,
      gender,
      color: color.trim(),
      price,
      type,
      cost,
      category,
      stock,
      discount,
      imageURLs: imgBBUrls,
      featured,
      lastModified: Date.now(),
    };

    axiosSecure.put(`/manage/update-product`, { id, data }).then((res) => {
      if (res.data._id) {
        toast.success("Updated Product!");
        setUpdateProductLoading(false);
        setRefetchData(true);
      } else {
        toast.error("Error Occurred");
        setUpdateProductLoading(false);
      }
      setUpdateProductLoading(false);
    });
  };

  //   HANDLE MAKE DRAFT
  const handleMakeDraft = async () => {
    setMakeDraftLoading(true);
    const data = {
      draft: true,
    };

    axiosSecure.put(`/manage/update-product`, { id, data }).then((res) => {
      if (res.data._id) {
        toast.success("Drafted Successfully");
        setMakeDraftLoading(false);
        setRefetchData(true);
      } else {
        toast.error("Error Occurred");
        setMakeDraftLoading(false);
      }
      setMakeDraftLoading(false);
    });
  };

  //   HANDLE PUBLISH
  const handlePublish = async () => {
    setPublishLoading(true);
    const data = {
      draft: false,
    };

    axiosSecure.put(`/manage/update-product`, { id, data }).then((res) => {
      if (res.data._id) {
        toast.success("Published Successfully");
        setPublishLoading(false);
        setRefetchData(true);
      } else {
        toast.error("Error Occurred");
        setPublishLoading(false);
      }
      setPublishLoading(false);
    });
  };

  return (
    <>
      {fetchingData ? (
        <>
          <h1 className="h-full flex flex-col items-center justify-center text-center gap-8 text-lg">
            Fetching Product Details
            <span className="loading loading-spinner loading-lg"></span>
          </h1>
        </>
      ) : (
        <>
          <div
            className="min-h-full h-full"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-duration="500"
          >
            {/* EDIT PRODUCT FORM */}
            <div className="flex gap-4 flex-col xl:flex-row">
              {/* PRODUCT INFO */}
              <div className="flex-1 gap-4 flex flex-col">
                {/* NAME/DESC/SIZE/GENDER */}
                <div className="bg-[#F9F9F9] p-4 rounded-lg">
                  <h1 className="text-2xl font-bold mb-2">
                    General Information
                  </h1>
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
                            sizes.includes("XS") &&
                            "bg-[#272727] text-background"
                          }`}
                          onClick={() => handleUpdateSize("XS")}
                        >
                          XS
                        </button>
                        <button
                          className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                            sizes.includes("S") &&
                            "bg-[#272727] text-background"
                          }`}
                          onClick={() => handleUpdateSize("S")}
                        >
                          S
                        </button>
                        <button
                          className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                            sizes.includes("M") &&
                            "bg-[#272727] text-background"
                          }`}
                          onClick={() => handleUpdateSize("M")}
                        >
                          M
                        </button>
                        <button
                          className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                            sizes.includes("XL") &&
                            "bg-[#272727] text-background"
                          }`}
                          onClick={() => handleUpdateSize("XL")}
                        >
                          XL
                        </button>
                        <button
                          className={`btn bg- hover:bg-primary hover:text-background hover:border-primary border-primary ${
                            sizes.includes("XXL") &&
                            "bg-[#272727] text-background"
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
                    {/* COLOR / FEATURED / TYPE */}
                    <div className="w-full space-y-4 text-lg my-4 md:my-0">
                      <div className="flex gap-6">
                        <div>
                          <h1 className="font-medium mb-2">Type</h1>
                          <div className="flex items-center flex-1 gap-x-4 gap-y-4 flex-wrap">
                            {/* ACCESSORY */}
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="radio-accessory"
                                className="radio"
                                checked={type === "accessory"}
                                onClick={() => setType("accessory")}
                              />
                              <label className="ml-2 block text-sm text-gray-900">
                                Accessory
                              </label>
                            </div>
                            {/* CLOTHING */}
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="radio-accessory"
                                className="radio"
                                checked={type === "clothing"}
                                onClick={() => setType("clothing")}
                              />
                              <label className="ml-2 block text-sm text-gray-900">
                                Clothing
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h1 className="font-medium mb-2">Featured</h1>
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
                        </div>
                      </div>

                      <div>
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
                </div>
                {/* PRICING AND STOCK */}
                <div className="bg-[#F9F9F9] p-4 rounded-lg flex-1">
                  <h1 className="text-2xl font-bold mb-2">Pricing And Stock</h1>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* PRICE */}
                    <div>
                      <h1 className="font-medium mb-2">Price /unit</h1>
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
                    {/* COST */}
                    <div>
                      <h1 className="font-medium mb-2">Cost /unit</h1>
                      <div className="relative">
                        <FiDollarSign className="absolute top-3 left-3"></FiDollarSign>
                        <input
                          onChange={(e) => {
                            let value = e.target.value.trim();
                            value = value.replace(/^0+/, ""); // Remove leading zeros
                            if (value === "" || /^\d*\.?\d*$/.test(value)) {
                              setCost(value || "0");
                            } else {
                              toast.error("Invalid Price");
                            }
                          }}
                          value={cost}
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
                    <h1 className="text-2xl font-bold mb-2">
                      Product Category
                    </h1>
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
            <div className="gap-3 max-w-lg mx-auto flex flex-col md:flex-row mt-4">
              {draft ? (
                <>
                  {/* PUBLISH BUTTON */}
                  <button
                    onClick={() => handlePublish()}
                    disabled={publishLoading}
                    className="btn flex-1 bg-transparent rounded-full text-green-600 border-green-600 hover:border-green-600 hover:bg-green-600 hover:text-white flex-nowrap whitespace-nowrap"
                  >
                    {publishLoading ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                      </>
                    ) : (
                      <>
                        <RiDraftLine className="text-lg"></RiDraftLine>Publish
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleMakeDraft()}
                    disabled={makeDraftLoading}
                    className="btn flex-1 bg-transparent rounded-full border-primary hover:border-primary hover:bg-primary hover:text-white flex-nowrap whitespace-nowrap"
                  >
                    {makeDraftLoading ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                      </>
                    ) : (
                      <>
                        <RiDraftLine className="text-lg"></RiDraftLine>Make
                        Draft
                      </>
                    )}
                  </button>
                </>
              )}
              {/* UPDATE PRODUCT BUTTON */}
              <button
                onClick={() => handleUpdateProduct()}
                disabled={updateProductLoading}
                className="btn flex-1 rounded-full border-yellow-300 bg-yellow-300 hover:bg-yellow-400 hover:border-400 flex-nowrap whitespace-nowrap"
              >
                {updateProductLoading ? (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                  </>
                ) : (
                  <>
                    <GoCheck className="text-xl"></GoCheck>Update Product
                  </>
                )}
              </button>
            </div>
            {/* MODAL */}
            <CategoryUpdateModal></CategoryUpdateModal>
          </div>
        </>
      )}
    </>
  );
};

export default EditProduct;
