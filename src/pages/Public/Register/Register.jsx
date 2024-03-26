import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  // LOADING STATES
  const [creatingUser, setCreatingUser] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  // FIREBASE AUTH
  const { createUser, signInWithGoogle } = useAuth();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // REDIRECT FUNCTIONS
  const navigate = useNavigate();

  // REGISTER FUNCTION
  const onSubmit = (data) => {
    setCreatingUser(true);
    createUser(data.Email, data.Password)
      .then(() => {
        toast.success("Signed Up Successfully");
        setCreatingUser(false);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
        setCreatingUser(false);
        reset();
      });
  };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* EMAIL */}
              <div className="mb-6">
                <div className="flex items-center gap-1 mb-2">
                  <h4 className="font-bold text-lg">Email</h4>
                  {errors.Email?.message && (
                    <p
                      role="alert"
                      className="text-xs text-red-500 ml-2 font-semibold"
                    >
                      {errors.Email?.message}
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  className="w-full border rounded-none h-12 px-4 focus:outline-none bg-gray-100"
                  placeholder="Email"
                  {...register("Email", {
                    required: "Email is required*",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {/* PASSWORD */}
              <div className="mb-6 relative">
                <div className="flex items-center gap-1 mb-2">
                  <h4 className="font-bold text-lg">Password</h4>
                  {errors.Password?.message && (
                    <p
                      role="alert"
                      className="text-xs text-red-500 ml-2 font-semibold"
                    >
                      {errors.Password?.message}
                    </p>
                  )}
                </div>
                <input
                  type={seePassword ? "text" : "password"}
                  className="w-full border rounded-none h-12 px-4 focus:outline-none bg-gray-100"
                  placeholder="Password"
                  {...register(
                    "Password",
                    {
                      required: "Password is required*",
                      minLength: {
                        value: 6,
                        message: "Must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                        message: "Must contain one upper and lower character",
                      },
                    },
                    {}
                  )}
                />
                <button
                  type="button"
                  className="absolute right-3 bottom-3 text-2xl text-gray-600"
                  onClick={() => {
                    setSeePassword(!seePassword);
                  }}
                >
                  {seePassword ? (
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  ) : (
                    <AiFillEye></AiFillEye>
                  )}
                </button>
              </div>
              <hr className="my-6" />
              <button className="btn w-full rounded-none bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300">
                {creatingUser ? (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                  </>
                ) : (
                  "Sign Up"
                )}
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
