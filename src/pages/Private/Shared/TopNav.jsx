import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoClose, IoMenu, IoPersonOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const TopNav = ({ userInfo, logOut }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation().pathname;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    closeDropdown();
  };

  return (
    <>
      <div data-aos="fade-down" data-aos-delay="0" data-aos-duration="800">
        <div className="p-4 flex justify-between gap-2 items-center bg-background border-b shadow-sm">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer-2"
              className="lg:hidden btn border-none bg-transparent hover:bg-transparent text-2xl shadow-none"
            >
              <IoMenu></IoMenu>
            </label>
            <h1 className="text-xl md:text-3xl font-semibold">
              {location === "/dashboard" && "Dashboard"}
              {location === "/dashboard/account" && "Account Details"}
              {location === "/dashboard/manage-users" && "Manage Users"}
              {location === "/dashboard/manage-products" && "Manage Products"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn text-3xl btn-circle text-primary bg-transparent border-primary hover:bg-primary hover:text-white hover:border-primary">
              <IoIosNotificationsOutline />
            </button>
            <div
              className="dropdown dropdown-end hidden md:block"
              ref={dropdownRef}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn bg-white border-none hover:bg-base-200 rounded-xl shadow-md"
              >
                <IoPersonOutline className="text-2xl md:text-3xl" />
                <div className="text-left">
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
                  <h2 className="text-gray-600 font-normal uppercase text-sm">
                    {userInfo?.userInfo?.role}
                  </h2>
                </div>
                {dropdownOpen ? (
                  <>
                    <IoClose className="text-xl"></IoClose>
                  </>
                ) : (
                  <>
                    <IoIosArrowDown className="text-xl" />
                  </>
                )}
              </div>
              {dropdownOpen && (
                <ul className="dropdown-content mt-3 z-50 p-2 shadow-xl space-y-1 bg-base-100 w-48 text-black font-heading rounded-lg">
                  {/* <button
                    onClick={() => {
                      navigate("/dashboard/account");
                      closeDropdown();
                    }}
                    className="bg-transparent text-primary shadow-none border-none hover:bg-bg-base-100 rounded-lg duration-300 btn w-full justify-between"
                  >
                    <IoPersonOutline className="text-2xl w-8" />
                    <h1 className="font-medium text-center flex-1">Account</h1>
                  </button>
                  <hr /> */}
                  <button
                    onClick={handleLogOut}
                    className="bg-transparent text-red-500 shadow-none border-none hover:bg-bg-base-100 rounded-lg duration-300 btn w-full justify-between"
                  >
                    <CiLogout className="text-2xl w-8" />
                    <h1 className="font-medium text-center flex-1">LogOut</h1>
                  </button>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
