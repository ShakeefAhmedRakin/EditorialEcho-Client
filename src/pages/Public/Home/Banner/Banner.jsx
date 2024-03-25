const Banner = () => {
  // container mx-auto px-1 md:px-10 xl:px-24 flex flex-col
  return (
    <>
      <div className="relative">
        <img
          src="/bannerbg.jpg"
          className="absolute h-full w-full top-0 object-cover z-10"
        />
        <div className="bg-black bg-opacity-70 absolute h-full w-full top-0 z-10"></div>
        <div className="font-heading pt-32 lg:pt-36 flex gap-3 lg:gap-8 container mx-auto z-10 px-2 relative">
          <div className="flex-1 flex justify-center">
            <div className="max-h-[700px]">
              <img
                src="/banner-1.png"
                className="object-cover w-full h-full rounded-t-3xl"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-sm md:text-3xl lg:text-5xl font-bold text-white">
              Embrace Urban Style with StreetWise Apparel
            </h1>
            <p className="font-light text-[10px] md:text-lg lg:text-2xl mb-5 md:mb-8 mt-2 text-white">
              Step into the city vibe with StreetWise. Explore our blend of edgy
              comfort and street-smart fashion, curated just for you.
            </p>
            <div className="pb-4">
              <button className="btn btn-xs md:btn-lg text-primary border-none bg-white hover:bg-white rounded-none w-full md:w-fit">
                <span className="text-[10px] md:text-base">SHOP NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
