import { Link, useLoaderData } from "react-router-dom";
import ProductImageSlider from "../../../components/Public/ProductImageSlider";
import { sortSizes } from "../../../utils/sortSizes";
const ProductDetails = () => {
  const product = useLoaderData();
  console.log(product);
  return (
    <div className="min-h-[65vh] py-24 flex flex-col lg:flex-row gap-8 container mx-auto px-2 font-heading">
      {product?.error ? (
        <>
          <div className="flex flex-col items-center justify-center text-center gap-y-12 font-medium w-full">
            <img src="/prodnotfound.webp" className="max-w-[14rem]" />
            <h1 className="max-w-md mx-auto">
              {`Sorry we couldn't find this product. But don't worry, you can find plenty of other products on our `}
              <Link to={"/"} className="font-bold link">
                homepage
              </Link>
              .
            </h1>
          </div>
        </>
      ) : (
        <>
          <div className="w-full lg:w-[45%]">
            <ProductImageSlider images={product.imageURLs}></ProductImageSlider>
          </div>
          <div className="lg:flex-1">
            <div className="flex justify-between gap-2 mb-1 items-center">
              {/* PRODUCT CATEGORY */}
              <h1 className="text-gray-500 font-bold uppercase">
                {product.category}
              </h1>
              {/* PRODUCT DISCOUNT */}
              <p className="py-1 px-3 text-white bg-primary text-sm shadow-lg">
                -{product.discount}% OFF
              </p>
            </div>
            {/* PRODUCT NAME */}
            <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
            {/* PRICE/DISCOUNT */}
            <div className="flex gap-12 items-center">
              <div className="flex gap-2 items-end">
                {/* DISCOUNT PRICE */}
                <p className="text-3xl">
                  ${" "}
                  {(
                    parseFloat(product.price) *
                    (1 - product.discount / 100)
                  ).toFixed(2)}
                </p>
                {/* CUT PRICE */}
                <p className="line-through text-gray-500 text-lg">
                  $ {product.price}
                </p>
              </div>
            </div>
            <hr className="my-2" />
            {/* SELECT SIZE */}
            {sortSizes(product?.sizes).map((size, index) => (
              <button className="btn" key={index}>
                {size}
              </button>
            ))}
            {/* PRODUCT DESCRIPTION */}
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
