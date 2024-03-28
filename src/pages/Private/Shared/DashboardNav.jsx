import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import { CiLogout } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";
import { IoPersonOutline } from "react-icons/io5";

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { logOut } = useAuth();

  const links = (
    <>
      <Link
        to={"/dashboard/account"}
        className={`duration-300 ${
          location.pathname === "/dashboard/account" && "font-semibold"
        }`}
      >
        <li>My Account</li>
        <div
          className={`w-full duration-300 p-[2px] rounded-t-full ${
            location.pathname === "/dashboard/account"
              ? "bg-primary"
              : "bg-gray-300"
          }`}
        ></div>
      </Link>

      {userInfo?.userInfo?.role === "admin" && (
        <>
          <Link
            to={"/dashboard"}
            className={`duration-300 ${
              location.pathname === "/dashboard" && "font-semibold"
            }`}
          >
            <li>Dashboard</li>
            <div
              className={`w-full duration-300 p-[2px] rounded-t-full ${
                location.pathname === "/dashboard"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            ></div>
          </Link>
          <Link
            to={"/dashboard/wip"}
            className={`duration-300 ${
              location.pathname === "/dashboard/wip" && "font-semibold"
            }`}
          >
            <li>Products</li>
            <div
              className={`w-full duration-300 p-[2px] rounded-t-full ${
                location.pathname === "/dashboard/wip"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            ></div>
          </Link>
          <Link
            to={"/dashboard/wip"}
            className={`duration-300 ${
              location.pathname === "/dashboard/wip" && "font-semibold"
            }`}
          >
            <li>Orders</li>
            <div
              className={`w-full duration-300 p-[2px] rounded-t-full ${
                location.pathname === "/dashboard/wip"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            ></div>
          </Link>
          <Link
            to={"/dashboard/wip"}
            className={`duration-300 ${
              location.pathname === "/dashboard/wip" && "font-semibold"
            }`}
          >
            <li>Staff</li>
            <div
              className={`w-full duration-300 p-[2px] rounded-t-full ${
                location.pathname === "/dashboard/wip"
                  ? "bg-primary"
                  : "bg-gray-300"
              }`}
            ></div>
          </Link>
        </>
      )}
    </>
  );

  //   LOGOUT FUNCTION
  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      <div
        className="bg-base-200 shadow-md"
        data-aos="fade-down"
        data-aos-delay="0"
        data-aos-duration="800"
      >
        <div className="container mx-auto px-2 md:px-4 font-heading">
          {/* TOP SECTION */}
          <div className="py-3">
            <button
              onClick={() => navigate("/")}
              className="btn bg-transparent shadow-none -ml-5 hover:bg-transparent border-none text-primary text-base"
            >
              <BsArrowLeftShort className="text-4xl"></BsArrowLeftShort>
              Back to Shopping
            </button>
          </div>
          <hr />
          {/* MIDDLE SECTION */}
          <div className="flex justify-between items-center">
            {/* MIDDLE LEFT CONTENT */}
            <h1 className="text-lg md:text-3xl font-bold">
              {location.pathname === "/dashboard" && "Dashboard"}
              {location.pathname === "/dashboard/account" && "Account Details"}
            </h1>
            {/* MIDDLE RIGHT CONTENT */}
            <div className="flex items-center gap-2 py-3">
              {/* PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center justify-between border-none p-1 rounded-full hover:bg-transparent duration-300"
                >
                  <div className="relative">
                    {userInfo?.userInfo?.role === "admin" && (
                      <div className="absolute -bottom-3 flex justify-center items-end w-full h-full">
                        <span className="badge badge-xs bg-red-500 text-white border-none font-bold">
                          ADMIN
                        </span>
                      </div>
                    )}

                    <IoPersonOutline className="text-2xl md:text-3xl"></IoPersonOutline>
                  </div>
                  <IoIosArrowDropdown className="text-2xl"></IoIosArrowDropdown>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 z-50 p-1 shadow space-y-3 bg-base-100 w-44 text-black font-heading"
                >
                  <button
                    onClick={() => handleLogOut()}
                    className="bg-red-500 text-white shadow-none border-none hover:bg-red-700 p-2 rounded-lg duration-300 btn w-full justify-start"
                  >
                    <a className="text-xl font-medium flex items-center">
                      <CiLogout className="text-2xl mr-3"></CiLogout>{" "}
                      <span className="flex-1">Logout</span>
                    </a>
                  </button>
                </ul>
              </div>
            </div>
          </div>
          <hr className="mb-1" />
          {/* NAVIGATION TITLES */}
          <div className="flex pt-3 gap-4 list-none text-base md:text-xl whitespace-nowrap overflow-x-auto scrollbar">
            {links}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
