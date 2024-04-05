const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import axios from "axios";

const uploadImagesToImgBB = async (imageList) => {
  try {
    const imgBBUrls = [];

    for (const image of imageList) {
      if (image?.data_url?.includes("https://i.ibb.co/")) {
        imgBBUrls.push({ data_url: image?.data_url });
      } else {
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
    }
    return imgBBUrls;
  } catch (error) {
    console.error("Error uploading images to ImgBB:", error);
    throw error;
  }
};

export { uploadImagesToImgBB };
