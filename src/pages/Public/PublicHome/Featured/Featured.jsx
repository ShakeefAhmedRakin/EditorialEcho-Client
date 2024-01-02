const Featured = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 h-[650px]">
        {/* MAIN FEATURE */}
        <div
          className="h-full duration-300 hover:scale-[1.005] cursor-pointer"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/19510924/pexels-photo-19510924/free-photo-of-women-in-coats-in-forest-in-winter.jpeg",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative top-[70%] bg-black bg-opacity-70 h-[30%] text-textDark p-4">
            {/* TITLE OF BLOG */}
            <h1 className="font-heading font-medium text-sm md:text-xl overflow-hidden whitespace-nowrap overflow-ellipsis">
              Enchanting Snowflakes: Captivating Christmas Fashion for Girls in
              the Snow
            </h1>
            <p className="font-text text-sm mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              debitis, beatae repellendus est quaerat perspiciatis aut? Ea earum
              optio, laudantium quam totam placeat vitae. Ea architecto
              molestiae quod iusto sint.
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col gap-1">
          {/* SECONDARY FEATURE */}
          <div
            className="flex-1 duration-300 hover:scale-[1.005] cursor-pointer"
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/763398/pexels-photo-763398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="flex-1 grid grid-cols-2 gap-1 h-full">
            {/* TERTIARY FEATURE */}
            <div
              className="h-full duration-300 hover:scale-[1.005] cursor-pointer"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/242492/pexels-photo-242492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            {/* TERTIARY FEATURE */}
            <div
              className="h-full duration-300 hover:scale-[1.005] cursor-pointer"
              style={{
                backgroundImage:
                  "url(https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
