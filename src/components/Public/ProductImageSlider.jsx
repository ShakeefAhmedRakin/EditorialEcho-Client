import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ProductImageSlider = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // SLIDER BUTTON FUNCTION
  const handleSliderButton = (type) => {
    const imageDiv = document.querySelector(".carousel");
    let newIndex = selectedIndex;
    if (type === "left") {
      newIndex = Math.max(0, selectedIndex - 1);
    } else if (type === "right") {
      newIndex = Math.min(images.length - 1, selectedIndex + 1);
    }
    imageDiv.classList.add("opacity-0");
    setTimeout(() => {
      imageDiv.classList.remove("opacity-0");
      setSelectedIndex(newIndex);
    }, 200);
  };

  // SLIDER BUTTON VISIBILITY
  const hideButton = (type) => {
    if (type === "left" && selectedIndex === 0) {
      return true;
    } else if (type === "right" && selectedIndex === images.length - 1) {
      return true;
    }
  };

  // HANDLE IMAGE SELECT
  const handleImageSelect = (index) => {
    const imageDiv = document.querySelector(".carousel");
    imageDiv.classList.add("opacity-50");
    setTimeout(() => {
      imageDiv.classList.remove("opacity-50");
      setSelectedIndex(index);
    }, 200);
  };

  return (
    <div className="select-none">
      {/* SLIDER IMAGE */}
      <div className="mb-2 relative overflow-hidden">
        {/* SELECTED IMAGE */}
        <img
          src={images[selectedIndex].data_url}
          className="w-full carousel aspect-square object-cover hover:scale-110 duration-500 hover:cursor-zoom-in rounded-[5px]"
          draggable={false}
        />
        {/* LEFT BUTTON */}
        <div
          className={`absolute text-3xl left-2 text-[#A6A6A6] duration-300 hover:cursor-pointer hover:text-[#121212] bg-black hover:bg-[#A6A6A6] bg-opacity-60 hover:bg-opacity-50 p-2 rounded-full top-1/2 ${
            hideButton("left") && "hidden"
          }`}
          onClick={() => handleSliderButton("left")}
        >
          <FaChevronLeft></FaChevronLeft>
        </div>
        {/* RIGHT BUTTON */}
        <div
          className={`absolute text-3xl right-2 text-[#A6A6A6] duration-300 hover:cursor-pointer hover:text-[#121212] bg-black hover:bg-[#A6A6A6] bg-opacity-60 hover:bg-opacity-50 p-2 rounded-full top-1/2 ${
            hideButton("right") && "hidden"
          }`}
          onClick={() => handleSliderButton("right")}
        >
          <FaChevronRight></FaChevronRight>
        </div>
      </div>
      {/* ALL THE IMAGES */}
      <div className={`grid grid-cols-4 gap-2`}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img.data_url}
            draggable={false}
            onClick={() => handleImageSelect(index)}
            className={`aspect-square p-1 duration-200 object-cover border-2 rounded-md hover:cursor-pointer ${
              selectedIndex === index ? "border-primary" : "border-transparent"
            }`}
          ></img>
        ))}
      </div>
    </div>
  );
};

ProductImageSlider.propTypes = {
  images: PropTypes.array,
};

export default ProductImageSlider;
