import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Login = () => {
  // LOADING STATES
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState(false);

  // REDIRECT FUNCTIONS
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting the state information from location
  const { from } = location.state || { from: { pathname: "/" } };

  // AXIOS
  const axiosPublic = useAxiosPublic();

  // FIREBASE AUTH
  const { user, signInUser, logOut, signInWithGoogle } = useAuth();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // LOGIN FUNCTION
  const onSubmit = (data) => {
    setLoading(true);
    signInUser(data.Email, data.Password)
      .then((res) => {
        axiosPublic
          .put("/update-last-logged", {
            uid: res.user.uid,
            time: res.user.metadata.lastSignInTime,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Logged In Successfully. Redirecting..");
              setLoading(false);
              reset();
              setTimeout(() => {
                navigate(from);
              }, 1000);
            } else {
              toast.error("Error occurred during login.");
            }
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  // LOGOUT FUNCTION
  const handleLogOut = () => {
    setLoading(true);
    logOut()
      .then(() => {
        toast.success("Logged Out");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  // GOOGLE SIGN IN FUNCTION
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((res) => {
        // AFTER FIREBASE CREATION
        const user = res.user;
        const userInfo = {
          uid: user.uid,
          email: user.email,
          firstName: "",
          lastName: "",
          role: "customer",
          address: [],
          orders: [],
          phone: "",
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        };
        axiosPublic.post("/create-user", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Signed In Successfully. Redirecting..");
            setTimeout(() => {
              navigate(from);
            }, 1000);
            return;
          }
          if (res.data.prevUser) {
            axiosPublic
              .put("/update-last-logged", {
                uid: user.uid,
                time: user.metadata.lastSignInTime,
              })
              .then(() => {
                toast.success("Signed In Successfully. Redirecting..");
                setTimeout(() => {
                  navigate(from);
                }, 1000);
              });
            return;
          }
          toast.error("Error occurred during login");
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="h-screen flex flex-row-reverse relative overflow-y-hidden">
      <div
        className="flex-1 flex items-center justify-center"
        data-aos="fade-up"
        data-aos-delay="0"
        data-aos-duration="800"
      >
        {/* LOGIN FORM */}
        <div className="bg-background py-12 px-8 font-heading flex-1 max-w-2xl">
          <div className="flex justify-between flex-col lg:flex-row items-center">
            <h1 className="font-heading font-semibold text-4xl">
              Street<span className="font-normal">Wise</span>
            </h1>
            <button
              onClick={() => handleGoogleSignIn()}
              className="btn border border-gray-700 rounded-none hover:border-primary bg-transparent hover:bg-base-200 hidden lg:flex"
            >
              <FaGoogle className="text-lg text-gray-70"></FaGoogle>Sign In With
              Google
            </button>
          </div>
          <hr className="my-6" />
          <h1 className="text-4xl font-medium text-center mb-6">Log In</h1>
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
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => handleLogOut()}
                  className="btn w-full rounded-none bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                    </>
                  ) : (
                    "Signed In Already. Log Out?"
                  )}
                </button>
              </>
            ) : (
              <>
                <button className="btn w-full rounded-none bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300">
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </>
            )}
          </form>
          <p className="text-center text-gray-700 font-medium mt-5 text-xs md:text-base">
            <Link to={"/forgot-password"} className=" hover:underline ml-1">
              Forgot Password?
            </Link>
          </p>
          <h1 className="text-center text-gray-700 font-medium mt-10 text-xs md:text-base">
            {`Don't have an account?`}
            {` `}
            <Link
              to={"/register"}
              className="font-bold text-black hover:underline ml-1"
            >
              Register Here
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
        <img src="/log.jpg" className="w-full h-full absolute object-cover" />
        <div className="absolute h-full w-full bg-black bg-opacity-0"></div>
      </div>
    </div>
  );
};

export default Login;
