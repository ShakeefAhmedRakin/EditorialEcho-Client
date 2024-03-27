import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

const Account = () => {
  const { userInfo, refetch } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  // INFORMATION STATES
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // EDITABLE STATES
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [firstNameEdit, setFirstNameEdit] = useState(false);
  const [lastNameEdit, setLastNameEdit] = useState(false);

  // FETCHING INFO
  useEffect(() => {
    setPhone(userInfo?.userInfo?.phone);
    setEmail(userInfo?.userInfo?.email);
    setFirstName(userInfo?.userInfo?.firstName);
    setLastName(userInfo?.userInfo?.lastName);
  }, [userInfo]);

  const [address, SetAddress] = useState([
    {
      addressLine: "West Rajabazar 66/12",
      city: "Dhaka",
      country: "Bangladesh",
      zip: "1142",
    },
  ]);

  // FUNCTION FOR UPDATING INFO
  const handleUpdateInfo = async (type) => {
    if (type === "first") {
      const trimmedFirstName = firstName.trim();
      if (trimmedFirstName && /^[a-zA-Z\s]+$/.test(trimmedFirstName)) {
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
      if (trimmedLastName && /^[a-zA-Z\s]+$/.test(trimmedLastName)) {
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
    if (type === "phone") {
      const trimmedPhone = phone.trim();
      if (
        trimmedPhone &&
        /^[0-9\s()-]+$/.test(trimmedPhone) &&
        trimmedPhone.length === 11
      ) {
        // UPDATING
        axiosSecure
          .put("/update-user-info", {
            uid: userInfo?.userInfo?.uid,
            type: type,
            data: trimmedPhone,
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Updated");
              refetch();
            }
          });
      } else {
        toast.error("Invalid phone number");
        setPhone(userInfo?.userInfo?.phone);
      }
    }
  };

  return (
    <>
      {/* INFORMATION */}
      <div className="flex flex-col md:flex-row h-full">
        {/* PROFILE INFO */}
        <div className="flex-1">
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold">Profile Details</h1>
          {/* First NAME */}
          <div className="my-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
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
                  firstNameEdit ? "w-16 right-[50px] p-2" : "w-16 right-0 p-1"
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
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
                  lastNameEdit ? "w-16 right-[50px] p-2" : "w-16 right-0 p-1"
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
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
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
          {/* PHONE */}
          <div className="my-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
              Phone Number
            </h2>
            <div className="relative">
              <input
                type="text"
                disabled={!phoneEdit}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className={`w-full pr-28 border p-4 duration-300 text-sm md:text-lg ${
                  phone || "border-red-500 border"
                } ${phoneEdit ? "bg-white" : "bg-gray-200 "}`}
                placeholder="Phone number is required"
                value={phone}
              />
              <div
                className={`absolute h-full top-0 flex gap-1 ${
                  phoneEdit ? "w-16 right-[50px] p-2" : "w-16 right-0 p-1"
                }`}
              >
                {phoneEdit ? (
                  <>
                    <button
                      onClick={() => {
                        handleUpdateInfo("phone").then(() => {
                          setPhoneEdit(!phoneEdit);
                        });
                      }}
                      className="h-full text-2xl w-full btn bg-green-500 hover:bg-green-600 text-white border-none shadow-none"
                    >
                      <FaCheck></FaCheck>
                    </button>
                    <button
                      onClick={() => {
                        setPhoneEdit(!phoneEdit);
                        setPhone(userInfo?.userInfo?.phone);
                      }}
                      className="h-full text-2xl w-full btn bg-red-500 hover:bg-red-600 text-white border-none shadow-none"
                    >
                      <RxCross1></RxCross1>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setPhoneEdit(!phoneEdit)}
                      className="h-full text-2xl w-full btn bg-transparent hover:bg-transparent border-none shadow-none"
                    >
                      <MdOutlineEdit></MdOutlineEdit>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        {/* ADDRESS */}
        <div className="flex-1">
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Address
          </h1>
          {address.map((item, index) => (
            <div key={index} className="text-xl">
              <hr className="my-2" />
              <div className="flex items-center">
                {/* ADDRESS */}
                <div className="flex-1">
                  <h1>{item.addressLine}</h1>
                  <h1>
                    {item.city} {item.zip}
                  </h1>
                  <h1>{item.country}</h1>
                </div>
                {/* BUTTONS */}
                <div className="flex justify-center">
                  <button className="btn border-none bg-red-600 hover:bg-red-700 text-white text-xl">
                    <RxCross2></RxCross2>
                  </button>
                </div>
              </div>

              <hr className="my-2" />
            </div>
          ))}
          <button className="btn border-none bg-green-500 hover:bg-green-600 text-white">
            Add <FaPlus></FaPlus>
          </button>
          <form>
            <div className="my-2">
              <input
                type="text"
                className={`w-full pr-28 border p-3 duration-300 text-sm md:text-lg `}
                placeholder="Address Line"
              />
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="my-2">
                <input
                  type="text"
                  className={`w-full pr-28 border p-3 duration-300 text-sm md:text-lg `}
                  placeholder="Address Line"
                />
              </div>
              <div className="my-2">
                <input
                  type="text"
                  className={`w-full pr-28 border p-3 duration-300 text-sm md:text-lg `}
                  placeholder="Address Line"
                />
              </div>
              <div className="my-2">
                <input
                  type="text"
                  className={`w-full pr-28 border p-3 duration-300 text-sm md:text-lg `}
                  placeholder="Address Line"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Account;
