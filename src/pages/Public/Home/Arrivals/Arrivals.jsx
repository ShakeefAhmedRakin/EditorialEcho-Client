const Arrivals = () => {
  return (
    <>
      <div className="relative">
        {/* WISE TEXT */}
        <div className="absolute w-full h-full flex items-center justify-end top-0 overflow-hidden z-0 pointer-events-none">
          <h1 className="font-heading text-[200px] md:text-[350px] xl:text-[500px] font-bold mb-72 top-0 opacity-10">
            WISE
          </h1>
        </div>
        <div className="container mx-auto px-2 relative">
          {/* ARRIVAL TITLE */}
          <div
            className="space-y-1 font-heading mb-8"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h1 className="text-3xl md:text-4xl lg:text-7xl text-center font-bold">
              Fresh <span className="font-extralight italic">Finds</span>{" "}
              Unveiled
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-6xl text-center font-bold">
              NEW <span className="font-extralight italic">Arrivals</span>
            </h1>
          </div>
          {/* PRODUCTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 relative">
            {/* CARD */}
            <div
              className="font-heading flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay="0"
              data-aos-duration="800"
            >
              <p className="font-bold text-sm md:text-2xl">001</p>
              <img
                src="/prod-1.jpg"
                className="w-full aspect-square object-cover object-top mb-2 rounded-sm"
              />
              <h1 className="font-bold text-base md:text-lg">Broken Hoodie</h1>
              <p className="text-xs md:text-base text-gray-700">Color: Black</p>
              <div className="flex-1 flex items-end">
                <p className="font-bold md:text-xl mt-4">$ 110.00</p>
              </div>
            </div>
            {/* CARD */}
            <div
              className="font-heading flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="800"
            >
              <p className="font-bold text-sm md:text-2xl">002</p>
              <img
                src="/prod-2.jpg"
                className="w-full aspect-square object-cover object-top mb-2 rounded-sm"
              />
              <h1 className="font-bold text-base md:text-lg">
                Two Toned Jacket
              </h1>
              <p className="text-xs md:text-base text-gray-700">
                Color: Red & White
              </p>
              <div className="flex-1 flex items-end">
                <p className="font-bold md:text-xl mt-4">$ 149.00</p>
              </div>
            </div>
            {/* CARD */}
            <div
              className="font-heading flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
            >
              <p className="font-bold text-sm md:text-2xl">003</p>
              <img
                src="/prod-3.jpg"
                className="w-full aspect-square object-cover object-top mb-2 rounded-sm"
              />
              <h1 className="font-bold text-base md:text-lg">
                Dark Magenta Coat
              </h1>
              <p className="text-xs md:text-base text-gray-700">
                Color: Magenta
              </p>
              <div className="flex-1 flex items-end">
                <p className="font-bold md:text-xl mt-4">$ 159.00</p>
              </div>
            </div>
            {/* CARD */}
            <div
              className="font-heading flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay="150"
              data-aos-duration="800"
            >
              <p className="font-bold text-sm md:text-2xl">004</p>
              <img
                src="/prod-4.jpg"
                className="w-full aspect-square object-cover object-top mb-2 rounded-sm"
              />
              <h1 className="font-bold text-base md:text-lg">Yellow T-Shirt</h1>
              <p className="text-xs md:text-base text-gray-700">
                Color: Yellow
              </p>
              <div className="flex-1 flex items-end">
                <p className="font-bold md:text-xl mt-4">$ 99.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Arrivals;
