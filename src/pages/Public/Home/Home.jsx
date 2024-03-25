import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <div className="my-10">
        <Categories></Categories>
      </div>
    </>
  );
};

export default Home;
