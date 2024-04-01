import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaCheck, FaMinus } from "react-icons/fa";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Account = () => {
  const { userInfo, refetch } = useUserInfo();
  const { user, resetPassword } = useAuth();
  const axiosSecure = useAxiosSecure();

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // INFORMATION STATES
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState([]);

  // EDITABLE STATES
  const [firstNameEdit, setFirstNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [addAddressForm, setAddAddressForm] = useState(false);

  // LOADER STATES
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  // FETCHING INFO
  useEffect(() => {
    setEmail(userInfo?.userInfo?.email);
    setFirstName(userInfo?.userInfo?.firstName);
    setLastName(userInfo?.userInfo?.lastName);
    setAddress(userInfo?.userInfo?.address);
  }, [userInfo]);

  // FUNCTION FOR UPDATING INFO
  const handleUpdateInfo = async (type) => {
    if (type === "first") {
      const trimmedFirstName = firstName.trim();
      if (
        trimmedFirstName &&
        /^[a-zA-Z\s]+$/.test(trimmedFirstName) &&
        trimmedFirstName !== userInfo?.userInfo?.firstName
      ) {
        // UPDATING
        axiosSecure
          .put("/update-user-info", {
            uid: userInfo?.userInfo?.uid,
            type: type,
            data: trimmedFirstName,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Updated");
              refetch();
            }
          });
      } else {
        toast.error("First name contains invalid characters");
        setFirstName(userInfo?.userInfo?.firstName);
      }
    }
    if (type === "last") {
      const trimmedLastName = lastName.trim();
      if (
        trimmedLastName &&
        /^[a-zA-Z\s]+$/.test(trimmedLastName) &&
        trimmedLastName !== userInfo?.userInfo?.lastName
      ) {
        // UPDATING
        axiosSecure
          .put("/update-user-info", {
            uid: userInfo?.userInfo?.uid,
            type: type,
            data: trimmedLastName,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Updated");
              refetch();
            }
          });
      } else {
        toast.error("Last name contains invalid characters");
        setLastName(userInfo?.userInfo?.lastName);
      }
    }
  };

  // FUNCTION FOR ADDING ADDRESS
  const handleAddressAdd = (data) => {
    setAddLoading(true);
    axiosSecure
      .put("/update-user-info", {
        uid: userInfo?.userInfo?.uid,
        type: "address",
        data: data,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Added address");
          refetch();
          reset();
          setAddAddressForm(!addAddressForm);
          setAddLoading(false);
          return;
        } else {
          toast.error("Error Occurred");
          setAddLoading(false);
        }
      })
      .catch(() => {
        toast.error("Error Occurred");
        setAddLoading(false);
      });
  };

  // FUNCTION FOR DELETE ADDRESS
  const handleDeleteAddress = (index) => {
    setDeleteLoading(true);
    axiosSecure
      .put("/update-user-info", {
        uid: userInfo?.userInfo?.uid,
        type: "address-delete",
        index: index,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Deleted address");
          refetch();
          setDeleteLoading(false);
          return;
        } else {
          toast.error("Error Occurred");
          setDeleteLoading(false);
        }
      })
      .catch(() => {
        toast.error("Error Occurred");
        setDeleteLoading(false);
      });
  };

  // PASSWORD RESET FUNCTION
  const handleResetPassword = () => {
    resetPassword(user?.email)
      .then(() => {
        toast.success("Email Sent!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      {/* INFORMATION */}
      <div
        className="flex flex-col h-full md:flex-row"
        // data-aos="fade-up"
        // data-aos-delay="0"
        // data-aos-duration="500"
      >
        {/* PROFILE INFO */}
        <div className="flex-1">
          {/* TITLE */}
          <h1 className="text-xl font-bold">Profile Details</h1>
          {/* First NAME */}
          <div className="my-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              First Name
            </h2>
            <div className="relative">
              <input
                type="text"
                disabled={!firstNameEdit}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className={`w-full pr-28 border p-4 duration-300 text-sm md:text-lg ${
                  firstName || "border-red-500 border"
                } ${firstNameEdit ? "bg-white" : "bg-gray-200 "}`}
                placeholder="Name is required"
                value={firstName}
              />
              <div
                className={`absolute h-full top-0 flex gap-1 ${
                  firstNameEdit
                    ? "w-16 right-[50px] p-2 -top-[5px] md:top-0"
                    : "w-16 right-0 p-1"
                }`}
              >
                {firstNameEdit ? (
                  <>
                    <button
                      onClick={() => {
                        handleUpdateInfo("first").then(() => {
                          setFirstNameEdit(!firstNameEdit);
                        });
                      }}
                      className="h-full text-2xl w-full btn bg-green-500 hover:bg-green-600 text-white border-none shadow-none"
                    >
                      <FaCheck></FaCheck>
                    </button>
                    <button
                      onClick={() => {
                        setFirstNameEdit(!firstNameEdit);
                        setFirstName(userInfo?.userInfo?.firstName);
                      }}
                      className="h-full text-2xl w-full btn bg-red-500 hover:bg-red-600 text-white border-none shadow-none"
                    >
                      <RxCross1></RxCross1>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setFirstNameEdit(!firstNameEdit)}
                      className="h-full text-2xl w-full btn bg-transparent hover:bg-transparent border-none shadow-none"
                    >
                      <MdOutlineEdit></MdOutlineEdit>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Last Name */}
          <div className="my-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Last Name
            </h2>
            <div className="relative">
              <input
                type="text"
                disabled={!lastNameEdit}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className={`w-full pr-28 border p-4 duration-300 text-sm md:text-lg ${
                  lastName || "border-red-500 border"
                } ${lastNameEdit ? "bg-white" : "bg-gray-200 "}`}
                placeholder="Name is required"
                value={lastName}
              />
              <div
                className={`absolute h-full top-0 flex gap-1 ${
                  lastNameEdit
                    ? "w-16 right-[50px] p-2 -top-[5px] md:top-0"
                    : "w-16 right-0 p-1"
                }`}
              >
                {lastNameEdit ? (
                  <>
                    <button
                      onClick={() => {
                        handleUpdateInfo("last").then(() => {
                          setLastNameEdit(!lastNameEdit);
                        });
                      }}
                      className="h-full text-2xl w-full btn bg-green-500 hover:bg-green-600 text-white border-none shadow-none"
                    >
                      <FaCheck></FaCheck>
                    </button>
                    <button
                      onClick={() => {
                        setLastNameEdit(!lastNameEdit);
                        setLastName(userInfo?.userInfo?.lastName);
                      }}
                      className="h-full text-2xl w-full btn bg-red-500 hover:bg-red-600 text-white border-none shadow-none"
                    >
                      <RxCross1></RxCross1>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setLastNameEdit(!lastNameEdit)}
                      className="h-full text-2xl w-full btn bg-transparent hover:bg-transparent border-none shadow-none"
                    >
                      <MdOutlineEdit></MdOutlineEdit>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* EMAIL */}
          <div className="my-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Email Address
            </h2>
            <input
              type="email"
              disabled={true}
              className={
                "w-full border bg-gray-200 p-4 duration-300 text-sm md:text-lg"
              }
              value={email}
            />
          </div>
          <div className="my-4">
            <button
              onClick={() => handleResetPassword()}
              className="btn w-full md:w-1/2 bg-transparent border-primary hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              Reset Password
            </button>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        {/* ADDRESS */}
        <div className="flex-1 w-full md:max-w-lg">
          {/* TITLE */}
          <h1 className="text-xl font-bold flex gap-1 items-center">
            Address{" "}
            <span
              className={`text-base ${
                address?.length === 3 || address?.length === 0
                  ? "text-red-500"
                  : "text-gray-500"
              } font-medium`}
            >
              ({address?.length})
            </span>
          </h1>
          {address?.length > 0 ? (
            <>
              {address?.map((item, index) => (
                <div key={index}>
                  <hr className="my-2" />
                  <div className="flex items-center">
                    {/* ADDRESS */}
                    <div className="flex-1">
                      <h1>{item.addressLine}</h1>
                      <h1>
                        {item.city} {item.zip}
                      </h1>
                      <h1>{item.country}</h1>
                      <h1>+88 {item.phone}</h1>
                    </div>
                    {/* DELETE BUTTON */}
                    <div className="flex justify-center">
                      <button
                        disabled={deleteLoading}
                        onClick={() => handleDeleteAddress(index)}
                        className="btn border-red-500 bg-transparent hover:bg-transparent text-red-600 hover:border-red-300 hover:bg-red-300 text-xl"
                      >
                        {deleteLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <RxCross2></RxCross2>
                        )}
                      </button>
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
              ))}
            </>
          ) : (
            <>
              <h1 className="text-center text-red-500 py-16">
                Address is required
              </h1>
            </>
          )}
          {address?.length < 3 && (
            <button
              onClick={() => {
                if (!addAddressForm && address.length > 2) {
                  toast.error("Maximum three addresses");
                  return;
                }
                setAddAddressForm(!addAddressForm);
              }}
              className={`btn ${
                addAddressForm
                  ? "border-red-500 hover:border-red-100 hover:bg-red-100  text-red-500"
                  : "border-green-500 hover:border-green-100 hover:bg-green-100  text-green-500"
              } w-full bg-transparent `}
            >
              {addAddressForm ? (
                <>
                  Cancel <FaMinus></FaMinus>
                </>
              ) : (
                <>
                  Add <FaPlus></FaPlus>
                </>
              )}
            </button>
          )}
          {addAddressForm && (
            <div className="my-2">
              <form onSubmit={handleSubmit(handleAddressAdd)}>
                {/* ADDRESS LINE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-1 ">
                  <div className="my-0.5">
                    <input
                      type="text"
                      className={`w-full border p-3 duration-300 outline-none text-sm ${
                        errors.addressLine && "border-red-300"
                      }`}
                      placeholder="Address Line"
                      {...register("addressLine", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-0.5">
                    <input
                      type="text"
                      className={`w-full border p-3 duration-300 text-sm outline-none ${
                        errors.phone && "border-red-300"
                      }`}
                      placeholder="Phone"
                      {...register("phone", {
                        required: true,
                        pattern: {
                          value: /^[0-9\s()-]+$/,
                          message: true,
                        },
                        minLength: 11,
                      })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-1">
                  <div className="my-0.5">
                    <input
                      type="select"
                      className={`w-full border p-3 duration-300 text-sm outline-none ${
                        errors.country && "border-red-300"
                      }`}
                      placeholder="Country"
                      {...register("country", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-0.5">
                    <input
                      type="text"
                      className={`w-full border p-3 duration-300 text-sm outline-none ${
                        errors.city && "border-red-300"
                      }`}
                      placeholder="City"
                      {...register("city", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="my-0.5">
                    <input
                      type="text"
                      className={`w-full border p-3 duration-300 text-sm outline-none ${
                        errors.zip && "border-red-300"
                      }`}
                      placeholder="ZIP"
                      {...register("zip", {
                        required: true,
                        pattern: {
                          value: /^[0-9\s()-]+$/,
                          message: true,
                        },
                        minLength: 4,
                        maxLength: 4,
                      })}
                    />
                  </div>
                </div>
                <button
                  disabled={addLoading}
                  className="btn w-full bg-transparent border-green-500 hover:bg-green-100 hover:border-green-100 text-green-500 mt-2"
                >
                  {addLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Add <FaPlus></FaPlus>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
