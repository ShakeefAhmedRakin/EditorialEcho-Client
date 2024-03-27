import { Outlet } from "react-router-dom";
import DashboardNav from "./Shared/DashboardNav";

const DashboardRoot = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <DashboardNav></DashboardNav>
      <div
        className="flex-1 container mt-4 mx-auto px-2 font-heading"
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="800"
      >
        <div className="shadow-md border rounded-t-lg h-full overflow-y-auto p-4 md:p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
