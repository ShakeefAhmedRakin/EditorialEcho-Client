import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaCheck } from "react-icons/fa";
const Account = () => {
  const { userInfo } = useUserInfo();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [phoneEdit, setPhoneEdit] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);

  useEffect(() => {
    setPhone(userInfo?.userInfo?.phone);
    setEmail(userInfo?.userInfo?.email);
    setName(userInfo?.userInfo?.fullName);
  }, [userInfo]);

  return (
    <>
      {/* INFORMATION */}
      <div className="flex h-full">
        <div className="flex-1">
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold">Profile Details</h1>
          {/* FULL NAME */}
          <div className="my-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
              Full Name
            </h2>
            <div className="relative">
              <input
                type="text"
                disabled={!nameEdit}
                className={`w-full pr-28 border p-4 duration-300 text-sm md:text-lg ${
                  name || "border-red-500 border"
                } ${nameEdit ? "bg-white" : "bg-gray-200 "}`}
                placeholder="Name is required"
                value={name}
              />
              <div
                className={`absolute h-full top-0 flex gap-1 ${
                  nameEdit ? "w-16 right-[50px] p-2" : "w-16 right-0 p-1"
                }`}
              >
                {nameEdit ? (
                  <>
                    <button
                      onClick={() => console.log("object")}
                      className="h-full text-2xl w-full btn bg-green-500 hover:bg-green-600 text-white border-none shadow-none"
                    >
                      <FaCheck></FaCheck>
                    </button>
                    <button
                      onClick={() => setNameEdit(!nameEdit)}
                      className="h-full text-2xl w-full btn bg-red-500 hover:bg-red-600 text-white border-none shadow-none"
                    >
                      <RxCross1></RxCross1>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setNameEdit(!nameEdit)}
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
          {/* Address */}
          <div className="my-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Phone Number
            </h2>
            <div>
              <input
                type="text"
                disabled={!phoneEdit}
                className={`w-full border bg-gray-200 p-4 mt-2 duration-300 text-sm md:text-lg ${
                  phone || "border-red-500"
                }`}
                placeholder="Phone is required"
                value={phone}
              />
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className=" max-w-lg w-full">
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold">Address</h1>
        </div>
      </div>
    </>
  );
};

export default Account;
