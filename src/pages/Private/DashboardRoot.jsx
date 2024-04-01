import { Outlet, useNavigate } from "react-router-dom";
import TopNav from "./Shared/TopNav";
import useUserInfo from "../../hooks/useUserInfo";
import useAuth from "../../hooks/useAuth";
import { IoArrowBack, IoClose, IoPersonOutline } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { PiUsersFour } from "react-icons/pi";
import { LuShirt } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { MdOutlineManageAccounts } from "react-icons/md";
const DashboardRoot = () => {
  const { userInfo } = useUserInfo();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //   SIDEBAR FUNCTIONS
  const closeSidebar = () => {
    const closeBtn = document.getElementById("my-drawer-2");
    if (closeBtn) {
      closeBtn.checked = false;
    }
  };

  // NAVIGATION LINKS
  const links = (
    <>
      {/* PRIVATE LINKS */}
      <Link to={"/dashboard"}>
        <li
          onClick={closeSidebar}
          className={`duration-300 border-2 border-transparent w-[95%] p-4 rounded-full gap-2 flex items-center ${
            location.pathname === "/dashboard"
              ? "text-primary bg-background"
              : "text-white hover:border-background"
          }`}
        >
          <TbLayoutDashboard className="text-2xl"></TbLayoutDashboard>Dashboard
        </li>
      </Link>
      <hr className="border-none my-0.5" />
      <Link to={"/dashboard/account"}>
        <li
          onClick={closeSidebar}
          className={`duration-300 border-2 border-transparent w-[95%] p-4 rounded-full gap-2 flex items-center ${
            location.pathname === "/dashboard/account"
              ? "text-primary bg-background"
              : "text-white hover:border-background"
          }`}
        >
          <MdOutlineManageAccounts className="text-2xl"></MdOutlineManageAccounts>
          Account
        </li>
      </Link>
      <hr className="border-none my-0.5" />
      {userInfo?.userInfo?.role === "admin" && (
        <>
          <Link to={"/dashboard/manage-users"}>
            <li
              onClick={closeSidebar}
              className={`duration-300 border-2 border-transparent w-[95%] p-4 rounded-full gap-2 flex items-center ${
                location.pathname === "/dashboard/manage-users"
                  ? "text-primary bg-background"
                  : "text-white hover:border-background"
              }`}
            >
              <PiUsersFour className="text-2xl"></PiUsersFour>
              Users
            </li>
          </Link>
          <hr className="border-none my-0.5" />
          <Link to={"/dashboard/manage-products"}>
            <li
              onClick={closeSidebar}
              className={`duration-300 border-2 border-transparent w-[95%] p-4 rounded-full gap-2 flex items-center ${
                location.pathname === "/dashboard/manage-products"
                  ? "text-primary bg-background"
                  : "text-white hover:border-background"
              }`}
            >
              <LuShirt className="text-2xl"></LuShirt>
              Products
            </li>
          </Link>
          <hr className="border-none my-0.5" />
          <Link to={"/dashboard/manage-orders"}>
            <li
              onClick={closeSidebar}
              className={`duration-300 border-2 border-transparent w-[95%] p-4 rounded-full gap-2 flex items-center ${
                location.pathname === "/dashboard/manage-orders"
                  ? "text-primary bg-background"
                  : "text-white hover:border-background"
              }`}
            >
              <BsCart2 className="text-2xl"></BsCart2>
              Orders
            </li>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="font-heading">
      <div className="drawer lg:drawer-open relative">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* PAGE CONTENT */}
        <div className="drawer-content relative min-h-screen flex flex-col">
          {/* TOP NAVIGATION BAR */}
          <div className="sticky top-0 w-full z-10">
            <TopNav userInfo={userInfo} logOut={logOut} />
          </div>
          {/* OUTLET CONTENT */}
          <div className="p-4 flex-1">
            <Outlet />
          </div>
        </div>
        {/* DRAWER CONTENT */}
        <div className="drawer-side fixed top-0 left-0 z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="w-72">
            <div
              data-aos="fade-right"
              data-aos-duration="600"
              className="flex flex-col min-h-screen h-full p-4 bg-primary text-xl font-semibold"
            >
              {/* TOP PART */}
              <div>
                {/* TOP buttons */}
                <div className="flex justify-between">
                  <button
                    className="btn btn-sm bg-transparent text-background hover:bg-transparent border-transparent hover:border-background text-xs"
                    onClick={() => navigate("/")}
                  >
                    <IoArrowBack></IoArrowBack>Go Back To Shopping
                  </button>
                  <label
                    onClick={closeSidebar}
                    className="flex lg:hidden justify-end text-background text-3xl"
                  >
                    <IoClose />
                  </label>
                </div>

                {/* Website name */}
                <h1 className="font-heading text-center font-semibold text-4xl text-white my-4">
                  Street<span className="font-normal">Wise</span>
                </h1>
                <hr className="mb-4" />

                {/* PROFILE INFO ( MOBILE VIEW ) */}
                <div
                  onClick={() => {
                    navigate("/dashboard/account");
                    closeSidebar();
                  }}
                  className="flex md:hidden mb-4 flex-col items-center justify-center gap-y-1 bg-background py-4 px-1 rounded-xl shadow-xl"
                >
                  <IoPersonOutline className="text-4xl"></IoPersonOutline>
                  <h1>
                    {!userInfo?.userInfo?.firstName ||
                    !userInfo?.userInfo?.lastName ? (
                      <>{userInfo?.userInfo?.email?.split("@")[0]}</>
                    ) : (
                      <>
                        {userInfo?.userInfo?.firstName}{" "}
                        {userInfo?.userInfo?.lastName}
                      </>
                    )}
                  </h1>
                  <span
                    className={`badge uppercase border-none ${
                      userInfo?.userInfo?.role === "admin" && "bg-red-500"
                    } ${
                      userInfo?.userInfo?.role === "customer" && "bg-blue-500"
                    }`}
                  >
                    {userInfo?.userInfo?.role}
                  </span>
                </div>

                {/* Navigation links */}
                <div className="w-full">{links}</div>
              </div>
              <div className="flex-1 flex items-end">
                <button
                  onClick={() => logOut()}
                  className={`duration-300 btn w-full rounded-full border-2 border-red-500 bg-transparent text-red-500 hover:text-background hover:bg-red-500 hover:border-red-500`}
                >
                  <SlLogout className="text-2xl"></SlLogout>
                  <h1 className="text-center flex-1 text-lg">Logout</h1>
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
