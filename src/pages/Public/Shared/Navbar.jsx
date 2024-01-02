import { RxHamburgerMenu } from "react-icons/rx";
import { MdInfoOutline, MdOutlineExplore } from "react-icons/md";
import { IoSearchCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={"/"} className={"flex items-center gap-1 hover:underline"}>
          <MdOutlineExplore className="text-2xl"></MdOutlineExplore>Explore
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={"flex items-center gap-1 hover:underline"}
        >
          <MdInfoOutline className="text-2xl"></MdInfoOutline>
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/search"}
          className={"flex items-center gap-1 hover:underline"}
        >
          <IoSearchCircleOutline className="text-2xl"></IoSearchCircleOutline>
          Search
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar py-5 border-b text-text dark:text-textDark">
      <div className="navbar-start">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" className="w-10" />
          <h1 className="font-heading font-semibold text-2xl text-text dark:text-textDark">
            Editorial<span className="font-normal">Echo</span>
          </h1>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="hidden lg:flex items-center gap-12 font-heading">
          {links}
          <li>
            <button className="btn bg-transparent border-primary dark:hover:border-primaryDark hover:bg-transparent hover:shadow-xl duration-300 hover:border-primary dark:border-primaryDark text-text dark:text-textDark px-6 whitespace-nowrap">
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
            className="dropdown-content mt-3 z-[1] shadow-xl bg-background dark:bg-backgroundDark text-text dark:text-textDark grid place-items-center grid-cols-1 gap-3 p-5 rounded-box w-72"
          >
            <div className="w-full border-b">Profile Info</div>

            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
