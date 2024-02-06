const Banner = () => {
  return (
    <>
      <div className="font-heading text-center pt-24">
        <h1
          className="text-xl md:text-5xl font-medium"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-easing="ease-out-cubic"
        >
          Craft Your Digital Narrative
        </h1>
        <p
          className="font-text text-sm md:text-lg mb-10 mt-2"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-easing="ease-out-cubic"
        >
          Empower Your Voice, Share Your Stories
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-easing="ease-out-cubic"
        >
          <button className="btn text-white border-none bg-primary hover:bg-primary">
            CREATE YOUR BLOG
          </button>
        </div>
        <div className="flex justify-center gap-10 mt-10 opacity-30 overflow-x-hidden overflow-y-hidden">
          <img
            src="bannerblog.png"
            alt="bannerimage"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          />
          <img
            src="bannerblog.png"
            alt="bannerimage"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
