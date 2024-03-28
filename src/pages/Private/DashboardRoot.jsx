import { Outlet } from "react-router-dom";
import DashboardNav from "./Shared/DashboardNav";

const DashboardRoot = () => {
  return (
    <>
      <div className="fixed w-full z-50 top-0">
        <DashboardNav></DashboardNav>
      </div>
      <div
        className="min-h-screen container mx-auto px-2 font-heading pt-48 md:pt-52 lg:pt-[200px]"
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="800"
      >
        <div className="shadow-md border rounded-lg p-4 md:p-8 h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardRoot;
