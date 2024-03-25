const Banner = () => {
  return (
    <>
      <div className="relative shadow-2xl">
        {/* BACKGROUND IMAGE */}
        <img
          src="/bannerbg.jpg"
          className="absolute h-full w-full top-0 object-cover object-top z-10"
        />
        {/* BACKGROUND OVERLAY */}
        <div className="bg-black bg-opacity-70 absolute h-full w-full top-0 z-10"></div>
        {/* CONTENT */}
        <div className="container mx-auto z-10 px-2 relative">
          <div className="font-heading flex gap-3 lg:gap-8 ">
            {/* BANNER MODEL */}
            <div className="flex-1 flex justify-center">
              <div className="max-h-[78vh] w-[80%]">
                <img
                  src="/banner-1.png"
                  className="object-cover object-top w-full h-full"
                  data-aos-delay="100"
                  draggable="false"
                />
              </div>
            </div>
            {/* BANNER CONTENT */}
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <h1
                  className="text-sm md:text-3xl lg:text-5xl font-bold text-white"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="800"
                >
                  Embrace Urban Style with StreetWise Apparel
                </h1>
                <p
                  className="font-light text-[10px] md:text-lg lg:text-2xl mb-5 md:mb-8 mt-2 text-white"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="800"
                >
                  Step into the city vibe with StreetWise. Explore our blend of
                  edgy comfort and street-smart fashion, curated just for you.
                </p>
                <div
                  className="pb-4"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  data-aos-duration="800"
                >
                  <button className="btn btn-xs md:btn-lg text-primary border-none bg-white hover:bg-white rounded-none w-full md:w-fit">
                    <span className="text-[10px] md:text-base">SHOP NOW</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
