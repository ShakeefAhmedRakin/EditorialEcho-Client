const Categories = () => {
  return (
    <>
      <div className="container mx-auto px-2">
        <div className="flex justify-around gap-3 md:gap-16">
          {/* CARD */}
          <div
            className="relative group max-h-[450px] max-w-xs cursor-pointer"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="absolute h-full w-full flex justify-center items-center">
              <h1 className="bg-primary text-white font-semibold font-heading py-1 md:py-3 text-[8px] md:text-base px-2 md:px-8 duration-300 md:group-hover:px-12 lg:group-hover:px-16 z-10">
                MEN`S
              </h1>
            </div>
            <img
              src="/cat1.png"
              className="w-full object-top object-cover h-full group-hover:scale-[1.02] duration-300"
              draggable="false"
            />
          </div>
          {/* CARD */}
          <div
            className="relative group max-h-[450px] max-w-xs cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="800"
          >
            <div className="absolute h-full w-full flex justify-center items-center">
              <h1 className="bg-primary text-white font-semibold font-heading py-1 md:py-3 text-[8px] md:text-base px-2 md:px-8 duration-300 md:group-hover:px-12 lg:group-hover:px-16 z-10">
                ACCESSORIES`S
              </h1>
            </div>
            <img
              src="/cat2.png"
              className="w-full object-top object-cover h-full group-hover:scale-[1.02] duration-300"
              draggable="false"
            />
          </div>
          {/* CARD */}
          <div
            className="relative group max-h-[450px] max-w-xs cursor-pointer"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <div className="absolute h-full w-full flex justify-center items-center">
              <h1 className="bg-primary text-white font-semibold font-heading py-1 md:py-3 text-[8px] md:text-base px-2 md:px-8 duration-300 md:group-hover:px-12 lg:group-hover:px-16 z-10">
                WOMEN`S
              </h1>
            </div>
            <img
              src="/cat3.png"
              className="w-full object-top object-cover h-full group-hover:scale-[1.02] duration-300"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
