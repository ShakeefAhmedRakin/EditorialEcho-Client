const Banner = () => {
  return (
    <>
      <div className="font-heading text-center py-32">
        <h1 className="text-xl md:text-5xl font-medium">
          Craft Your Digital Narrative
        </h1>
        <p className="font-text text-sm md:text-lg mb-10 mt-2">
          Empower Your Voice, Share Your Stories
        </p>
        <button className="btn text-white border-none bg-primary hover:bg-primary">
          CREATE YOUR BLOG
        </button>
        <div className="flex justify-center gap-10 mt-10 opacity-30  overflow-x-hidden">
          <img src="bannerblog.png" alt="bannerimage" />
          <img src="bannerblog.png" alt="bannerimage" />
        </div>
      </div>
    </>
  );
};

export default Banner;
