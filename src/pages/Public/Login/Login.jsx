import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <div className="flex justify-around my-28">
        <div className="bg-primary text-white flex items-center flex-col justify-center flex-1 rounded-3xl">
          <h1 className="text-center text-2xl font-text">Welcome to</h1>
          <h1 className="font-heading text-center font-semibold text-6xl mt-1 mb-10">
            Editorial<span className="font-normal">Echo</span>
          </h1>
          <p className="text-center font-heading max-w-[80%] mb-4">{`Don't have an account?`}</p>
          <button className="btn px-20 uppercase rounded-full font-bold text-background hover:text-primary bg-transparent border-background hover:bg-background hover:shadow-xl hover:border-background">
            Sign Up
          </button>
        </div>
        <div className="bg-background dark:bg-backgroundDark py-12 px-8 font-heading flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-medium">Sign In</h1>
            <div>
              <button className="btn btn-circle border border-secondary hover:border-primary bg-transparent">
                <FaGoogle className="text-lg text-secondary"></FaGoogle>
              </button>
            </div>
          </div>
          <hr className="my-6" />
          <form>
            {/* EMAIL */}
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-2">Email</h4>
              <input
                type="text"
                className="w-full border rounded-full h-12 px-4 focus:outline-none bg-gray-100"
                placeholder="Email"
              />
            </div>
            {/* PASSWORD */}
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-2">Password</h4>
              <input
                type="password"
                className="w-full border rounded-full h-12 px-4 focus:outline-none bg-gray-100"
                placeholder="Password"
              />
            </div>
            <hr className="my-6" />
            <button className="btn w-full rounded-full bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300">
              Sign In
            </button>
            <div className="flex justify-end px-2 mt-3">
              <span className="link text-gray-600">Forgot Password</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
