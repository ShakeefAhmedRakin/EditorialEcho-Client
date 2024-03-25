import Arrivals from "./Arrivals/Arrivals";
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="my-16">
        <Categories></Categories>
      </div>
      <div className="my-16">
        <Arrivals></Arrivals>
      </div>
    </>
  );
};

export default Home;
