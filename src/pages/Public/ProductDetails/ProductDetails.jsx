import { Link, useLoaderData } from "react-router-dom";
import ProductImageSlider from "../../../components/Public/ProductImageSlider";
import { sortSizes } from "../../../utils/sortSizes";
import { TbRulerMeasure } from "react-icons/tb";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
const ProductDetails = () => {
  const product = useLoaderData();
  const [selectedSize, setSelectedSize] = useState(sortSizes(product.sizes)[0]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <Helmet>
        <title>SteetWise | {product.name}</title>
      </Helmet>
      <div className="min-h-[65vh] py-24 flex flex-col lg:flex-row gap-8 container mx-auto px-2 font-heading">
        {product?.error ? (
          <>
            <div
              data-aos="fade-up"
              className="flex flex-col items-center justify-center text-center gap-y-12 font-medium w-full"
            >
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
              <ProductImageSlider
                images={product.imageURLs}
              ></ProductImageSlider>
            </div>
            <div className="lg:flex-1" data-aos="fade-up" data-aos-delay={100}>
              {/* PRODUCT CATEGORY AND DISCOUNT */}
              <div className="flex justify-between gap-2 mb-1 items-center">
                {/* PRODUCT CATEGORY */}
                <h1 className="text-gray-500 font-bold text-sm md:text-base uppercase">
                  {product.category}
                </h1>
                {/* PRODUCT DISCOUNT */}
                <p className="py-1 px-3 text-white text-xs md:text-sm bg-primary shadow-lg">
                  -{product.discount}% OFF
                </p>
              </div>
              {/* PRODUCT NAME */}
              <h1 className="text-2xl md:text-4xl font-semibold mb-2">
                {product.name}
              </h1>
              {/* PRICE/DISCOUNT PRICE */}
              <div className="flex gap-12 items-center">
                <div className="flex gap-2 items-end">
                  {/* DISCOUNT PRICE */}
                  <p className="text-2xl md:text-3xl">
                    ${" "}
                    {(
                      parseFloat(product.price) *
                      (1 - product.discount / 100)
                    ).toFixed(2)}
                  </p>
                  {/* CUT PRICE */}
                  <p className="line-through text-gray-500 text-md text:text-lg">
                    $ {product.price}
                  </p>
                </div>
              </div>
              <hr className="my-2" />
              {/* PRODUCT DESCRIPTION */}
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
              {/* SELECT SIZE */}
              <div className="mt-4">
                <h1 className="text-gray-500 mb-2 text-sm">SELECT SIZE</h1>
                <div className="flex flex-wrap gap-1">
                  {sortSizes(product?.sizes).map((size, index) => (
                    <button
                      className={`btn btn-sm md:btn-md rounded-sm  hover:border-primary hover:bg-primary shadow-sm hover:text-white ${
                        selectedSize === size
                          ? "bg-primary border-primary text-white"
                          : "bg-transparent border-primary text-primary"
                      }`}
                      key={index}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 underline mt-5 font-medium hover:font-bold duration-100">
                  <TbRulerMeasure className="text-lg"></TbRulerMeasure>Size
                  Guide
                </button>
              </div>
              {/* BUTTONS */}
              <div className="flex flex-col gap-3 max-w-lg mt-10">
                <button className="btn rounded-sm bg-primary text-white border-primary hover:bg-primary hover:border-primary hover:shadow-xl">
                  ADD TO BAG
                </button>
                <button className="btn rounded-sm bg-transparent border-primary text-primary hover:bg-transparent hover:border-primary hover:shadow-xl">
                  SAVE TO WISHLIST
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
