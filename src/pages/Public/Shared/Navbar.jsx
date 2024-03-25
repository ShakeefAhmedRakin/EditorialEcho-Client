import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
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

  const location = useLocation();

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
        className={`navbar py-8 lg:py-12 text-white container mx-auto px-2 relative ${
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
            <li>
              <button
                onClick={() => navigate("/login")}
                className="btn bg-white hover:bg-base-200 px-10 border-none rounded-none text-primary"
              >
                Log In
              </button>
            </li>
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
              className="dropdown-content mt-3 z-50 shadow-xl bg-background dark:bg-backgroundDark text-text dark:text-textDark grid place-items-center grid-cols-1 gap-3 p-5 rounded-box w-72"
            >
              <div className="w-full border-b">Profile Info</div>

              {links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
