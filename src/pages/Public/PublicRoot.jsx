import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const PublicRoot = () => {
  return (
    <div className="">
      <div>
        <Navbar></Navbar>
        <ScrollRestoration top={true}></ScrollRestoration>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PublicRoot;
