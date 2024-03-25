import Banner from "./Banner/Banner";
import Features from "./Features/Features";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="py-10">
        <Features></Features>
      </div>
    </>
  );
};

export default Home;
