import { CgDetailsMore, CgDollar } from "react-icons/cg";
import { sortSizes } from "../../utils/sortSizes";
import { TbPercentage } from "react-icons/tb";
import PropTypes from "prop-types";
import { IoMdArrowDropdown } from "react-icons/io";
import { calculateRevenue } from "../../utils/calculateRevenue";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductTableRow = ({ product }) => {
  const navigate = useNavigate();
  return (
    <tr className="even:bg-[#F9F9F9]">
      {/* PRODUCT IMAGE */}
      <td className="w-28 p-2">
        <img
          src={product?.imageURLs[0]?.data_url || "/image-not-available.png"}
          className="w-28 aspect-square object-cover rounded-md"
        />
      </td>
      {/* PRODUCT DETAILS */}
      <td>
        <div className="flex items-center gap-1">
          <h1 className="font-semibold text-sm xl:text-base truncate w-fit">
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
        <div className="text-xs">
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
      </td>
      {/* STOCK */}
      <td className="text-xs xl:text-base">
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
      </td>
      {/* PRICE / DISCOUNT */}
      <td className="text-xs xl:text-base">
        <span className="flex items-center gap-1">
          <CgDollar className="text-base xl:text-lg text-yellow-400"></CgDollar>{" "}
          {product?.price}
        </span>
        <span className="flex items-center gap-1">
          <TbPercentage className="text-base xl:text-lg text-green-400"></TbPercentage>{" "}
          {product?.discount}
        </span>
      </td>
      {/* REVENUE */}
      <td className="text-xs xl:text-base">
        {
          <span className="flex items-center gap-1">
            <CgDollar className="text-base xl:text-lg text-green-600"></CgDollar>{" "}
            {calculateRevenue(product?.price, product?.cost, product?.orders)}
          </span>
        }
      </td>
      {/* BUTTONS */}
      <td className="w-28">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={product?._id}
            role="button"
            className="btn border-base-300 bg-transparent rounded-md focus:outline-none hover:bg-transparent"
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
      </td>
    </tr>
  );
};

ProductTableRow.propTypes = {
  product: PropTypes.object,
};

export default ProductTableRow;
