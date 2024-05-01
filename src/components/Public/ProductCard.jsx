import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  return (
    <div className="font-heading">
      <p className="font-bold text-sm md:text-2xl">00{index + 1}</p>
      <div
        className="flex flex-col h-full hover:cursor-pointer border-b-2 pb-4 border-transparent rounded-md hover:border-primary duration-500"
        onClick={() => {
          navigate(`/product/id/${product._id}`);
        }}
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.imageURLs[0].data_url}
            className="w-full h-full aspect-square object-cover object-top mb-2 rounded-sm transition-transform duration-500 transform hover:scale-[1.2]"
            alt={product.name}
          />
        </div>
        <h1 className="font-bold text-base md:text-lg ">{product.name}</h1>
        <p className="text-xs md:text-base text-gray-700">
          Color: {product.color}
        </p>
        <div className="flex-1 flex items-end">
          <p className="font-bold md:text-xl mt-4">$ {product.price}</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
};

export default ProductCard;
