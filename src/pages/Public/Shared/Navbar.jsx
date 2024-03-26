import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RiListSettingsLine } from "react-icons/ri";
import { toast } from "sonner";
import { GoHome } from "react-icons/go";
import { FaShirt } from "react-icons/fa6";

const Navbar = () => {
  // FIREBASE AUTH INFO
  const { user, logOut } = useAuth();

  // NAVIGATION FUNCTION
  const navigate = useNavigate();
  const location = useLocation();

  // NAV LINKS
  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={
            "flex items-center gap-1 hover:underline underline-offset-4 duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/explore"}
          className={
            "flex items-center gap-1 hover:underline underline-offset-4 duration-300"
          }
        >
          Explore
        </NavLink>
      </li>
    </>
  );

  // FUNCTIONS

  // LOGGING OUT FUNCTION
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.error("Logged Out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // const axiosSecure = useAxiosSecure();

  // useEffect(() => {
  //   axiosSecure.get("/test").then((res) => console.log(res.data));
  // }, [axiosSecure]);

  return (
    <div className={`relative shadow-2xl`}>
      {/* BACKGROUND IMAGE */}
      <img
        src="/bannerbg.jpg"
        className="absolute h-full w-full top-0 object-cover object-top"
      />
      {/* BACKGROUND OVERLAY */}
      <div className="bg-black bg-opacity-70 absolute h-full w-full top-0"></div>

      {/* NAVBAR CONTENT */}
      <div
        className={`navbar py-8 lg:py-12 text-white container mx-auto px-4 md:px-9 relative ${
          location.pathname === "/" && "absolute top-0 left-0 right-0"
        }`}
      >
        <div className="navbar-start">
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-semibold text-4xl text-white">
              Street<span className="font-normal">Wise</span>
            </h1>
          </div>
        </div>
        <div className="navbar-end">
          <ul className="hidden lg:flex items-center gap-12 font-heading text-xl">
            {links}
            {user ? (
              <>
                <div className="dropdown dropdown-end w-[121.55px] flex justify-end">
                  <div
                    tabIndex={1}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-full rounded-full">
                      <img
                        alt="Profile Avatar"
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={1}
                    className="mt-20 z-50 p-5 shadow space-y-3 dropdown-content bg-base-100 w-64 text-black"
                  >
                    <button className="bg-transparent shadow-none border-none hover:bg-primary p-2 rounded-lg hover:text-white duration-300 btn w-full justify-start">
                      <a className="text-xl font-medium flex items-center">
                        <RiListSettingsLine className="text-2xl mr-3"></RiListSettingsLine>
                        <span className="flex-1">Account</span>
                      </a>
                    </button>
                    <button
                      onClick={() => handleLogOut()}
                      className="bg-transparent shadow-none border-none hover:bg-primary p-2 rounded-lg hover:text-white duration-300 btn w-full justify-start"
                    >
                      <a className="text-xl font-medium flex items-center">
                        <CiLogout className="text-2xl mr-3"></CiLogout>{" "}
                        <span className="flex-1">Logout</span>
                      </a>
                    </button>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn bg-white hover:bg-base-200 px-10 border-none rounded-none text-primary"
                  >
                    Log In
                  </button>
                </li>
              </>
            )}
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden -mr-2"
            >
              <RxHamburgerMenu className="text-2xl"></RxHamburgerMenu>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-50 px-5 pt-7 pb-5 shadow space-y-3 bg-base-100 w-64 text-black font-heading "
            >
              {user && (
                <>
                  <div className="w-full">
                    <div className="flex items-center flex-col gap-2">
                      <img
                        alt="Profile Avatar"
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
                        }
                        className="w-10 rounded-full"
                      />
                      <h1 className="text-center text-xs">{user.email}</h1>
                    </div>
                  </div>
                  <hr />
                </>
              )}

              <button
                onClick={() => navigate("/")}
                className={`shadow-none border-none ${
                  location.pathname === "/"
                    ? "bg-primary  hover:bg-primary text-white"
                    : "bg-transparent  hover:bg-primary hover:text-white"
                } p-2 rounded-lg duration-300 btn w-full justify-start`}
              >
                <a className="text-xl font-medium flex items-center">
                  <GoHome className="text-2xl mr-3"></GoHome>
                  <span className="flex-1">Home</span>
                </a>
              </button>
              <button
                onClick={() => navigate("/explore")}
                className={`shadow-none border-none ${
                  location.pathname === "/explore"
                    ? "bg-primary  hover:bg-primary text-white"
                    : "bg-transparent  hover:bg-primary hover:text-white"
                } p-2 rounded-lg duration-300 btn w-full justify-start`}
              >
                <a className="text-xl font-medium flex items-center">
                  <FaShirt className="text-2xl mr-3"></FaShirt>{" "}
                  <span className="flex-1">Explore</span>
                </a>
              </button>
              {user ? (
                <>
                  <hr />
                  <button className="bg-transparent shadow-none border-none hover:bg-primary p-2 rounded-lg hover:text-white duration-300 btn w-full justify-start">
                    <a className="text-xl font-medium flex items-center">
                      <RiListSettingsLine className="text-2xl mr-3"></RiListSettingsLine>
                      <span className="flex-1">Account</span>
                    </a>
                  </button>
                  <button
                    onClick={() => handleLogOut()}
                    className="bg-transparent shadow-none border-none hover:bg-primary p-2 rounded-lg hover:text-white duration-300 btn w-full justify-start"
                  >
                    <a className="text-xl font-medium flex items-center">
                      <CiLogout className="text-2xl mr-3"></CiLogout>{" "}
                      <span className="flex-1">Logout</span>
                    </a>
                  </button>
                </>
              ) : (
                <>
                  <hr />
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-transparent shadow-none border-none hover:bg-primary p-2 rounded-lg hover:text-white duration-300 btn w-full justify-start"
                  >
                    <a className="text-xl font-medium flex items-center">
                      <CiLogin className="text-2xl mr-3"></CiLogin>{" "}
                      <span className="flex-1">Log In</span>
                    </a>
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
