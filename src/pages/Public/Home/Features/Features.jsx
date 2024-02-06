const Features = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-y-4 gap-x-10 px-2">
        <div
          className="bg-primary bg-opacity-30 w-full rounded-lg shadow-xl py-20 px-5"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <img
            src="feat-1.png"
            className="w-full aspect-video max-h-36 object-contain"
          />
          <h1 className="text-center font-heading font-bold text-lg lg:text-2xl mt-6">
            Easy Interface
          </h1>
          <p className="text-center font-text text-xs lg:text-sm mt-3">
            Streamline your blogging experience with our user-friendly
            interface. Effortlessly create and manage your posts with intuitive
            tools.
          </p>
        </div>
        <div
          className=" bg-primary text-white w-full rounded-lg shadow-xl py-20 px-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img
            src="feat-2.png"
            className="w-full aspect-video max-h-36 object-contain"
          />
          <h1 className="text-center font-heading font-bold text-lg lg:text-2xl mt-6">
            Blog Spotlight
          </h1>
          <p className="text-center font-text text-xs lg:text-sm mt-3">
            Shine a spotlight on your blog with our featured section. Gain
            exposure and connect with a wider audience.
          </p>
        </div>
        <div
          className="bg-primary bg-opacity-30 w-full rounded-lg shadow-xl py-20 px-5"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <img
            src="feat-3.png"
            className="w-full aspect-video max-h-36 object-contain"
          />
          <h1 className="text-center font-heading font-bold text-lg lg:text-2xl mt-6">
            Personalized Profile
          </h1>
          <p className="text-center font-text text-xs lg:text-sm mt-3">
            Showcase your personality with a customizable profile. Share your
            story and connect with others who share your interests.
          </p>
        </div>
      </div>
    </>
  );
};

export default Features;
