import Banner from "./Banner/Banner";
import Features from "./Features/Features";

const Home = () => {
  return (
    <>
      <div className="py-4">
        <Banner></Banner>
      </div>
      <div className="py-10">
        <Features></Features>
      </div>
    </>
  );
};

export default Home;
