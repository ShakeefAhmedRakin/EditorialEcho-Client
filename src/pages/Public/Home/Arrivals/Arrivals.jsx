import { useEffect } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useState } from "react";
import ProductCard from "../../../../components/Public/ProductCard";

const Arrivals = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosPublic.get("/public/get-products/featured").then((res) => {
      setFeatured(res.data);
    });
    setLoading(false);
  }, [axiosPublic]);

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
            {loading ? (
              <>
                <div>Loading</div>
              </>
            ) : (
              <>
                {featured.map((product, index) => (
                  <div
                    key={product._id}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                    data-aos-duration="800"
                  >
                    <ProductCard product={product} index={index}></ProductCard>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Arrivals;
