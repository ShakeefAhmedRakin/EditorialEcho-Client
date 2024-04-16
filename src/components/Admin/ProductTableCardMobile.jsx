import { CgDetailsMore, CgDollar } from "react-icons/cg";
import { sortSizes } from "../../utils/sortSizes";
import { TbPercentage } from "react-icons/tb";
import PropTypes from "prop-types";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateRevenue } from "../../utils/calculateRevenue";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";

const ProductTableCardMobile = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-base-100 shadow-md border rounded-lg">
      {/* PRODUCT IMAGE */}
      <div className="relative">
        {product.featured && (
          <span className="badge absolute badge-sm left-1 top-1 border-none bg-green-500 font-bold">
            Featured
          </span>
        )}
        <img
          src={product?.imageURLs[0]?.data_url || "/image-not-available.png"}
          className="w-full aspect-video rounded-t-lg  mx-auto object-cover"
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-2">
        {/* NAME */}
        <div className="flex items-center justify-between gap-1">
          <h1 className="font-semibold text-sm truncate w-fit">
            {product?.name ? `${product.name}` : "N/A"}
          </h1>
          <span
            className={`badge border-none badge-xs text-[9px] bg-base-300 font-bold ${
              product?.draft ? "text-red-400" : "text-green-500"
            }`}
          >
            {product?.draft ? "DRAFT" : "ON SALE"}
          </span>
        </div>
        <hr />
        {/* DETAILS */}
        <div className="text-xs grid grid-cols-2 gap-1 mt-1">
          <p className="flex gap-1">
            <span className="font-semibold">Type:</span>
            <span className="uppercase">{product?.type}</span>
          </p>
          <p>
            <span className="font-semibold">Gender: </span>
            <span className="uppercase">
              {product?.gender ? `${product?.gender}` : "N/A"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Category: </span>
            <span className="uppercase">
              {product?.category ? `${product?.category}` : "N/A"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Color: </span>
            <span className="uppercase">
              {product?.color ? `${product?.color}` : "N/A"}
            </span>
          </p>
          <p className="flex gap-1">
            <span className="font-semibold">Sizes:</span>
            {product?.sizes?.length > 0 ? (
              <>
                {sortSizes(product.sizes).map((size) => (
                  <span key={size}>{size}</span>
                ))}
              </>
            ) : (
              <span>NONE</span>
            )}
          </p>
        </div>
        <hr />
        {/* STOCK / PRICE / REVENUE */}
        <div className="flex items-center flex-row-reverse justify-between gap-2">
          {/* STOCK */}
          <div>
            {product?.stock ? (
              <span className="text-green-400 font-medium">
                In Stock{" "}
                <span className="text-primary font-normal text-sm">
                  ({product?.stock})
                </span>
              </span>
            ) : (
              <span className="text-red-400 font-medium">
                Out of Stock{" "}
                <span className="text-primary font-normal text-sm">
                  ({product?.stock})
                </span>
              </span>
            )}
          </div>
          {/* PRICE/DISCOUNT/REVENUE */}
          <div>
            <span className="flex items-center gap-1">
              <CgDollar className="text-base xl:text-lg text-yellow-400"></CgDollar>{" "}
              {product?.price}
            </span>
            <span className="flex items-center gap-1">
              <TbPercentage className="text-base xl:text-lg text-green-400"></TbPercentage>{" "}
              {product?.discount}
            </span>
            <span className="flex items-center gap-1">
              <BsGraphUp className="text-base xl:text-lg text-green-600"></BsGraphUp>{" "}
              {calculateRevenue(product?.price, product?.cost, product?.orders)}
            </span>
          </div>
        </div>
        <hr />
        {/* BUTTON */}
        <div className="dropdown dropdown-bottom dropdown-end mt-2 flex justify-end">
          <div
            tabIndex={product?._id}
            role="button"
            className="btn btn-sm flex-nowrap text-xs xl:btn-md border-base-300 bg-transparent rounded-md focus:outline-none hover:bg-transparent"
          >
            Actions <IoMdArrowDropdown></IoMdArrowDropdown>
          </div>
          <ul
            tabIndex={product?._id}
            className="dropdown-content z-[1] p-2 bg-base-100 w-32 flex flex-col items-start gap-y-2 rounded-lg shadow"
          >
            <button className="btn w-full btn-sm flex-nowrap bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500">
              <span className="w-5 text-lg">
                <CgDetailsMore></CgDetailsMore>
              </span>
              <span className="flex-1 text-left">Details</span>
            </button>
            <button
              className="btn w-full btn-sm flex-nowrap bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              onClick={() => navigate(`/dashboard/edit-product/${product._id}`)}
            >
              <span className="w-5 text-lg">
                <MdOutlineEdit></MdOutlineEdit>
              </span>
              <span className="flex-1 text-left">Edit</span>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

ProductTableCardMobile.propTypes = {
  product: PropTypes.object,
};

export default ProductTableCardMobile;
