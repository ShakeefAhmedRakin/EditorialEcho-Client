import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/explore"}>Explore</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar py-5">
      <div className="navbar-start">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10" />
          <h1 className="font-heading font-semibold text-2xl">
            Editorial<span className="font-normal">Echo</span>
          </h1>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="hidden lg:flex items-center gap-5 font-heading">
          {links}
          <li>
            <button className="btn bg-transparent border-primary hover:bg-transparent hover:shadow-xl duration-300 hover:border-primary">
              Log In
            </button>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RxHamburgerMenu className="text-2xl -mr-4"></RxHamburgerMenu>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
