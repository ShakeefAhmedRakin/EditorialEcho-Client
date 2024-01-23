import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const PublicRoot = () => {
  return (
    <div className="">
      <div className="container mx-auto px-1 md:px-10 xl:px-24 min-h-screen flex flex-col">
        <Navbar></Navbar>

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PublicRoot;
