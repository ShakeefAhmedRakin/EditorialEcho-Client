import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="h-screen flex relative overflow-y-hidden">
        <div
          className="flex-1 flex items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="800"
        >
          {/* REGISTER FORM */}
          <div className="bg-background dark:bg-backgroundDark py-12 px-8 font-heading flex-1 max-w-2xl">
            <div className="flex justify-between flex-col lg:flex-row items-center">
              <h1 className="font-heading font-semibold text-4xl">
                Street<span className="font-normal">Wise</span>
              </h1>
              <button className="btn border border-gray-700 rounded-none hover:border-primary bg-transparent hover:bg-base-200 hidden lg:flex">
                <FaGoogle className="text-lg text-gray-70"></FaGoogle>Sign In
                With Google
              </button>
            </div>
            <hr className="my-6" />
            <h1 className="text-4xl font-medium text-center mb-6">
              Create Account
            </h1>
            <form>
              {/* EMAIL */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-2">Email</h4>
                <input
                  type="text"
                  className="w-full border rounded-none h-12 px-4 focus:outline-none bg-gray-100"
                  placeholder="Email"
                />
              </div>
              {/* PASSWORD */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-2">Password</h4>
                <input
                  type="password"
                  className="w-full border rounded-none h-12 px-4 focus:outline-none bg-gray-100"
                  placeholder="Password"
                />
              </div>
              <hr className="my-6" />
              <button className="btn w-full rounded-none bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300">
                Sign Up
              </button>
              {/* <div className="flex justify-end px-2 mt-3">
                <span className="link text-gray-600">Forgot Password</span>
              </div> */}
            </form>
            <h1 className="text-center text-gray-700 font-medium mt-10 text-xs md:text-base">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-bold text-black hover:underline ml-1"
              >
                Log in here
              </Link>
            </h1>
            <button className="btn border border-gray-700 rounded-none hover:border-primary bg-transparent hover:bg-base-200 lg:hidden w-full mt-8">
              <FaGoogle className="text-lg text-gray-70"></FaGoogle>Sign In With
              Google
            </button>
          </div>
        </div>
        {/* BANNER */}
        <div
          className="w-[45%] relative hidden lg:flex"
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="800"
        >
          <img src="/reg.jpg" className="w-full h-full absolute object-cover" />
          <div className="absolute h-full w-full bg-black bg-opacity-0"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
