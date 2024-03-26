import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import { CiLogout } from "react-icons/ci";
import useAuth from "../../../hooks/useAuth";

const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { logOut } = useAuth();

  const links = (
    <>
      <Link
        to={"/dashboard"}
        className={`duration-300 ${
          location.pathname === "/dashboard" && "font-semibold"
        }`}
      >
        <li>Dashboard</li>
        <div
          className={`w-full duration-300 p-[2px] rounded-full ${
            location.pathname === "/dashboard" ? "bg-primary" : "bg-transparent"
          }`}
        ></div>
      </Link>
      <Link
        to={"/dashboard/account"}
        className={`duration-300 ${
          location.pathname === "/dashboard/account" && "font-semibold"
        }`}
      >
        <li>Account</li>
        <div
          className={`w-full duration-300 p-[2px] rounded-full ${
            location.pathname === "/dashboard/account"
              ? "bg-primary"
              : "bg-transparent"
          }`}
        ></div>
      </Link>
    </>
  );

  //   LOGOUT FUNCTION
  const handleLogOut = () => {
    logOut();
  };

  return (
    <>
      <div className="bg-base-200 shadow-md">
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
          <div className="py-1 flex justify-between items-center">
            {/* MIDDLE LEFT CONTENT */}
            <h1 className="text-lg md:text-3xl font-bold">
              {location.pathname === "/dashboard" && "Dashboard"}
              {location.pathname === "/dashboard/account" && "Account"}
            </h1>
            {/* MIDDLE RIGHT CONTENT */}
            <div className="flex items-center gap-2">
              {/* NEED HELP BUTTON */}
              <button className="btn btn-xs md:btn-md text-primary shadow-none border-transparent hover:border-primary hover:bg-transparent">
                Need Help?
              </button>
              {/* PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center justify-between border-none p-1 rounded-full hover:bg-transparent duration-300"
                >
                  <div className="relative">
                    {userInfo?.userInfo?.role === "admin" && (
                      <div className="absolute flex justify-center items-end w-full h-full">
                        <span className="badge badge-xs bg-red-500 text-white border-none">
                          ADMIN
                        </span>
                      </div>
                    )}
                    {userInfo?.userInfo?.role === "customer" && (
                      <div className="absolute flex justify-center items-end w-full h-full">
                        <span className="badge badge-xs bg-blue-500 text-white border-none">
                          CUSTOMER
                        </span>
                      </div>
                    )}
                    <img
                      src="https://thumbs.dreamstime.com/b/mixed-race-woman-packing-clothing-orders-smiles-to-camera-women-85190817.jpg"
                      className="aspect-square w-10 md:w-16 object-cover rounded-full"
                    />
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
          <div className="flex gap-4 list-none text-base md:text-xl">
            {links}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;