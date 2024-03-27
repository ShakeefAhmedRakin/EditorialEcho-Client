import { useEffect } from "react";
import { useState } from "react";

const Featured = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/blog.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-[650px]">
        {/* MAIN FEATURE */}
        <div
          className="duration-300 hover:scale-[1.005] cursor-pointer"
          style={{
            backgroundImage: `url(${blogs[0]?.image}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative top-[60%] bg-black bg-opacity-70 h-[40%] text-textDark p-4">
            {/* TITLE OF BLOG */}
            <h1 className="font-heading font-medium text-lg md:text-xl overflow-hidden whitespace-nowrap overflow-ellipsis">
              {blogs[0]?.title}
            </h1>
            <p className="overflow-y-hidden mb-8  max-h-[90%] text-ellipsis text-xs md:text-base">
              {blogs[0]?.content}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {/* SECONDARY FEATURE */}
          <div
            className="flex-1 duration-300 hover:scale-[1.005] cursor-pointer"
            style={{
              backgroundImage: `url(${blogs[1]?.image}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative top-[60%] bg-black bg-opacity-70 h-[40%] text-textDark p-4">
              {/* TITLE OF BLOG */}
              <h1 className="font-heading font-medium text-sm md:text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">
                {blogs[1]?.title}
              </h1>
              <p className="overflow-y-hidden mb-8 max-h-[90%] text-ellipsis text-xs md:text-sm">
                {blogs[1]?.content}
              </p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-1 h-full">
            {/* TERTIARY FEATURE */}
            <div
              className="h-full duration-300 hover:scale-[1.005] cursor-pointer"
              style={{
                backgroundImage: `url(${blogs[2]?.image}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="relative top-[70%] bg-black bg-opacity-70 h-[30%] text-textDark p-4">
                {/* TITLE OF BLOG */}
                <h1 className="font-heading font-medium text-sm md:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {blogs[2]?.title}
                </h1>
                <p className="overflow-y-hidden mb-8  max-h-[70%] text-ellipsis text-xs">
                  {blogs[2]?.content}
                </p>
              </div>
            </div>
            {/* TERTIARY FEATURE */}
            <div
              className="h-full duration-300 hover:scale-[1.005] cursor-pointer"
              style={{
                backgroundImage: `url(${blogs[3]?.image}`,
                backgroundPosition: "center",
              }}
            >
              <div className="relative top-[70%] bg-black bg-opacity-70 h-[30%] text-textDark p-4">
                {/* TITLE OF BLOG */}
                <h1 className="font-heading font-medium text-sm md:text-base overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {blogs[3]?.title}
                </h1>
                <p className="overflow-y-hidden mb-8  max-h-[70%] text-ellipsis text-xs">
                  {blogs[3]?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
