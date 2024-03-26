import { Outlet } from "react-router-dom";
import DashboardNav from "./Shared/DashboardNav";

const DashboardRoot = () => {
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <DashboardNav></DashboardNav>
      <div className="flex-1 overflow-y-scroll">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardRoot;
