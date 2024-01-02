import Categories from "./Categories/Categories";
import Featured from "./Featured/Featured";

const PublicHome = () => {
  return (
    <>
      <div className="py-4">
        <Featured></Featured>
      </div>
      <div className="py-4">
        <Categories></Categories>
      </div>
    </>
  );
};

export default PublicHome;
