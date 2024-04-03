import ImageUploading from "react-images-uploading";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";

const ProductImageUpload = ({ imageURLs, setImageURls }) => {
  const maxNumber = 4;

  const onChange = (imageList) => {
    setImageURls(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={imageURLs}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              {imageList.map((image, index) => (
                <div key={index} className="image-item relative">
                  <div className="relative">
                    <img
                      src={image.data_url}
                      alt=""
                      className={`aspect-square object-cover border-[3px] rounded-lg ${
                        index === 0 && "border-yellow-300"
                      }`}
                      draggable={false}
                    />
                    {index === 0 && (
                      <span className="absolute badge border-none bg-black bg-opacity-60 text-yellow-500 uppercase bottom-2 left-2">
                        Preview Image
                      </span>
                    )}
                  </div>
                  <div className="image-item__btn-wrapper absolute w-full flex justify-between top-0 p-2">
                    <button
                      onClick={() => onImageUpdate(index)}
                      className="text-lg w-8 flex justify-center items-center text-yellow-400 bg-black bg-opacity-60 rounded-md p-1 hover:scale-[1.04] duration-300"
                    >
                      <FaCamera></FaCamera>
                    </button>
                    <button
                      onClick={() => onImageRemove(index)}
                      className="text-2xl w-8 flex justify-center items-center text-red-500 bg-black bg-opacity-60 rounded-md p-1 hover:scale-[1.04] duration-300"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </div>
                </div>
              ))}
              <div
                style={isDragging ? { backgroundColor: "#EEEEEE" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className={`text-green-500 rounded-lg flex items-center justify-center gap-2 border-green-500 border-2 border-dashed flex-col hover:cursor-pointer duration-200 ${
                  imageURLs.length % 2 === 0
                    ? "md:col-span-2 min-h-[256px]"
                    : ""
                } ${imageURLs.length === maxNumber && "hidden"}`}
              >
                <FaUpload className="text-3xl"></FaUpload> Drop or Browse
              </div>
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

ProductImageUpload.propTypes = {
  imageURLs: PropTypes.array,
  setImageURls: PropTypes.func,
};

export default ProductImageUpload;
