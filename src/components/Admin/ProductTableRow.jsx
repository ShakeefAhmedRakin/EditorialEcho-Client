import { CgDollar } from "react-icons/cg";
import { TiDropbox } from "react-icons/ti";
import { sortSizes } from "../../utils/sortSizes";
import { TbPercentage } from "react-icons/tb";
import PropTypes from "prop-types";

const calculateRevenue = (price, cost, orders) => {
  let totalSold = 0;
  orders.forEach((order) => {
    totalSold += order?.quantity;
  });
  return ((price - cost) * totalSold).toFixed(1);
};

const ProductTableRow = ({ product }) => {
  return (
    <tr className="grid grid-cols-6 gap-2 p-2 even:bg-[#F9F9F9] rounded-lg">
      {/* PRODUCT DETAILS */}
      <td className="col-span-2 flex gap-2">
        <img
          src={product?.imageURLs[0]?.data_url || "/image-not-available.png"}
          className="w-44 aspect-square object-cover rounded-md"
        />
        {/* PRODUCT DETAIL */}
        <div className="h-full flex flex-col">
          <h1 className="font-semibold text-lg">
            {product?.name ? `${product.name}` : "N/A"}
          </h1>
          <div>
            <p className="text-sm">
              <span className="font-semibold">Gender: </span>
              <span className="uppercase">
                {product?.gender ? `${product?.gender}` : "N/A"}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Category: </span>
              <span className="uppercase">
                {product?.category ? `${product?.category}` : "N/A"}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Color: </span>
              <span className="uppercase">
                {product?.color ? `${product?.color}` : "N/A"}
              </span>
            </p>
            <p className="text-sm flex gap-1">
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
          <div className="flex items-end mb-2 gap-2 flex-1 h-full">
            <span className="flex items-center gap-1">
              <CgDollar className="text-xl text-green-500"></CgDollar>{" "}
              {product?.price}
            </span>
            <span className="flex items-center gap-1">
              {" "}
              <TiDropbox className="text-xl text-orange-500"></TiDropbox>{" "}
              {product?.stock}
            </span>
            <span className="flex items-center gap-1">
              {" "}
              <TbPercentage className="text-xl text-blue-500"></TbPercentage>{" "}
              {product?.discount}
            </span>
          </div>
        </div>
      </td>
      {/* ORDERS */}
      <td className="font-semibold">{product?.orders?.length}</td>
      <td className="font-semibold">{product?.stock}</td>
      <td className="font-semibold flex flex-col justify-center items-end">
        <span className="flex items-center gap-1">
          <CgDollar></CgDollar>{" "}
          {calculateRevenue(product.price, product.cost, product.orders)}
        </span>
        <span className="flex items-center gap-1">
          <CgDollar></CgDollar>{" "}
          {calculateRevenue(product.price, product.cost, product.orders)}
        </span>
      </td>
    </tr>
  );
};

ProductTableRow.propTypes = {
  product: PropTypes.object,
};

export default ProductTableRow;
