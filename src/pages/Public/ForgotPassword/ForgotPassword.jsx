import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  // FIREBASE FUNCTION
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  //   NAVIGATION
  const navigate = useNavigate();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // FORGOT PASSWORD FUNCTION
  const handleForgotPassword = (data) => {
    setLoading(true);
    forgotPassword(data.Email)
      .then(() => {
        toast.success("Email Sent!");
        setLoading(false);
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center relative overflow-y-hidden">
        <div
          className="bg-background dark:bg-backgroundDark py-12 px-8 font-heading flex-1 max-w-2xl"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="800"
        >
          <h1 className="font-heading font-semibold text-4xl text-center">
            Street<span className="font-normal">Wise</span>
          </h1>
          <hr className="mt-2" />
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            {/* EMAIL */}
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-2 h-4">
                {errors.Email?.message && (
                  <p
                    role="alert"
                    className="text-xs text-red-500 ml-2 font-semibold"
                  >
                    {errors.Email?.message}
                  </p>
                )}
              </div>
              <div className="flex items-center flex-col md:flex-row gap-y-5">
                <input
                  type="text"
                  className="md:flex-1 w-full  border rounded-none h-12 px-4 focus:outline-none bg-gray-100"
                  placeholder="Email"
                  {...register("Email", {
                    required: "Email is required*",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <button className="btn rounded-none bg-primary hover:bg-primary text-white font-bold border-none hover:scale-[1.01] duration-300 w-full md:w-[215.02px]">
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                    </>
                  ) : (
                    <>
                      <span>Send Password Reset Mail</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
