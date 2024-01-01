import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const PublicRoot = () => {
  return (
    <>
      <div className="container mx-auto px-1 md:px-10 xl:px-24">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default PublicRoot;
