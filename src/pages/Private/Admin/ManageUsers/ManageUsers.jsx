import { useEffect, useState } from "react";
import useGetUsersCount from "../../../../hooks/useGetUsersCount";
import useGetUsers from "../../../../hooks/useGetUsers";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserInfo from "../../../../hooks/useUserInfo";
import { toast } from "sonner";

const ManageUsers = () => {
  // FILTER USE STATES
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();

  // FETCHING DATA
  const { usersCount, countLoading, refetchCount } = useGetUsersCount({
    filter,
    searchName,
  });

  const { users, usersLoading, refetchUsers, isRefetchingUsers } = useGetUsers({
    filter,
    currentPage,
    itemsPerPage,
    searchName,
  });

  // ------------- PAGINATION -------------
  const numberOfPages = Math.ceil(usersCount.count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // PAGINATION FUNCTIONS
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // REFETCH COUNT
  useEffect(() => {
    refetchCount();
  }, [refetchCount, filter, searchName]);

  // REFETCH DATA
  useEffect(() => {
    refetchUsers();
  }, [refetchUsers, filter, currentPage, itemsPerPage, searchName]);

  // FUNCTIONS FOR USER ACTIONS
  const handleChangeRole = (uid, role, name) => {
    let displayName = uid;
    if (name.length !== 1) {
      displayName = name;
    }

    if (confirm(`Change role of user ${displayName} to ${role} `) == true) {
      axiosSecure
        .put("/manage/change-user-role", {
          uid: uid,
          role: role,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Updated Role");
            refetchUsers();
          } else {
            toast.error("Error Occurred");
          }
        })
        .catch(() => toast.error("Internal Server Error"));
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {/* PAGINATION CONTROLS */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* FILTER */}
        <div className="flex items-center gap-2 font-medium">
          <p>Filters</p>
          <select
            className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none w-full md:w-fit select-sm md:select-md"
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">None</option>
            <option value="admin">Only Admin</option>
            <option value="customer">Only Customer</option>
            <option value="staff">Only Staff</option>
          </select>
        </div>
        {/* SEARCH */}
        <div className="flex-1">
          <input
            type="text"
            className="max-w-md w-full rounded-lg bg-base-200 outline-none text-sm p-3 md:text-base"
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/;
              if (regex.test(e.target.value)) {
                setCurrentPage(0);
                setSearchName(e.target.value);
              }
            }}
            value={searchName}
            placeholder="Search By Name"
          />
        </div>
        {/* NEXT/PREV BUTTONS */}
        <div className="flex-1 flex justify-between md:justify-end items-center">
          {/* NEXT/PREV CONTROLS */}
          <div className="flex items-center flex-row-reverse md:flex-row gap-2">
            <h1 className="font-medium hidden md:block">
              {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage, usersCount.count)} of{" "}
              {usersCount.count}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                className="btn bg-transparent hover:bg-transparent btn-xs md:btn-md"
              >
                <GrLinkPrevious />
              </button>
              <h1 className="w-2 text-center font-medium">{currentPage + 1}</h1>
              <button
                onClick={handleNextPage}
                className="btn bg-transparent hover:bg-transparent btn-xs md:btn-md"
              >
                <GrLinkNext />
              </button>
            </div>
          </div>
          {/* PER PAGE DROPDOWN (MOBILE DEVICE) */}
          <div className="md:hidden items-center gap-2 font-medium flex text-xs">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none select-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <p>per page</p>
          </div>
        </div>
      </div>
      {/* PER PAGE DROPDOWN (TABLET++ DEVICE) */}
      <div className="md:flex items-center gap-2 mt-2 font-medium hidden">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <p>per page</p>
      </div>

      <hr className="my-2" />

      {/* TABLET TO LARGE DEVICES */}
      <div className="h-[470px] xl:h-[570px] overflow-y-auto hidden md:block">
        <table className="w-full">
          <tbody className="w-full">
            {countLoading || usersLoading || isRefetchingUsers ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-6 gap-2 p-4 odd:bg-base-100"
                  >
                    {/* NAME AND UID */}
                    <td className="col-span-2 bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
                    {/* ADDRESS */}
                    <td className="bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
                    {/* STATISTICS */}
                    <td className="col-span-2 bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
                    {/* ACTIONS */}
                    <td className="bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="grid grid-cols-6 gap-2 p-4 odd:bg-base-100"
                  >
                    {/* NAME AND UID */}
                    <td className="col-span-2">
                      <h1 className="font-bold text-sm xl:text-xl flex items-center gap-1 whitespace-nowrap">
                        {user?.firstName && user?.lastName ? (
                          <>
                            {user.firstName} {user.lastName}{" "}
                            {user.uid === userInfo?.userInfo?.uid && (
                              <span className="bg-red-500 text-white badge badge-xs xl:badge-md">
                                YOU
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="text-red-700">N/A</span>
                          </>
                        )}
                      </h1>
                      <h1 className="text-gray-600 text-xs xl:text-base">
                        {user.email}
                      </h1>
                      <p className="text-[9px] xl:text-xs text-gray-500 font-medium">
                        #{user.uid}
                      </p>
                    </td>
                    {/* ADDRESS */}
                    <td>
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <button
                          tabIndex={0}
                          role="button"
                          disabled={user.address.length === 0 && true}
                          className={`btn bg-transparent rounded-md border-base-300 hover:bg-base-200 disabled:bg-base-300 shadow-none flex-nowrap whitespace-nowrap btn-sm xl:btn-md text-xs xl:text-sm`}
                        >
                          {user.address.length === 0 ? "N/A" : "Address"}{" "}
                          <IoMdArrowDropdown></IoMdArrowDropdown>
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[20] p-2 shadow bg-base-100 rounded-md w-fit"
                        >
                          {user?.address.map((address, index) => (
                            <li
                              key={index}
                              className="whitespace-nowrap p-1 even:bg-gray-100 rounded-md text-xs xl:text-sm"
                            >
                              <p>{address.addressLine}</p>
                              <p>
                                {address.city} {address.zip}, {address.country}
                              </p>
                              <p>{address.phone}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    {/* STATISTICS */}
                    <td className="col-span-2 text-[10px] whitespace-nowrap xl:text-sm text-gray-500 font-normal">
                      <h1>
                        <span className="font-semibold">Account Created</span>
                        <br></br> {user.creationTime}
                      </h1>
                      <h1>
                        <span className="font-semibold">Last Log In</span>
                        <br></br> {user.lastSignInTime}
                      </h1>
                    </td>
                    {/* ACTIONS */}
                    <td className="text-right">
                      <select
                        className={`select font-heading border-base-300 bg-transparent  focus:outline-none md:w-fit select-xs text-xs xl:select-md xl:text-sm ${
                          user.role === "admin" && "text-red-600"
                        } ${user.role === "customer" && "text-green-600"} ${
                          user.role === "staff" && "text-blue-600"
                        }`}
                        defaultValue={user.role}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          const changed = handleChangeRole(
                            user.uid,
                            newRole,
                            `${user.firstName} ${user.lastName}`
                          );

                          if (!changed) {
                            e.target.value = user.role;
                          }
                        }}
                      >
                        <option value="admin" className="text-primary">
                          Admin
                        </option>
                        <option value="customer" className="text-primary">
                          Customer
                        </option>
                        <option value="staff" className="text-primary">
                          Staff
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
                {5 - users.length >= 0 && (
                  <>
                    {[...Array(5 - users.length)].map((_, index) => (
                      <tr
                        key={index}
                        className="grid grid-cols-6 gap-2 p-4 odd:bg-base-100"
                      >
                        {/* NAME AND UID */}
                        <td className="col-span-2 bg-transparent h-[62px] xl:h-[82px] rounded-lg"></td>
                        {/* ADDRESS */}
                        <td className="bg-transparent h-[62px] xl:h-[82px] rounded-lg"></td>
                        {/* STATISTICS */}
                        <td className="col-span-2 bg-transparent h-[62px] xl:h-[82px] rounded-lg"></td>
                        {/* ACTIONS */}
                        <td className="bg-transparent h-[62px] xl:h-[82px] rounded-lg"></td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE DEVICES */}
      <div className="block md:hidden space-y-3">
        {countLoading || usersLoading || isRefetchingUsers ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-[144.5px] w-full bg-gray-100 animate-pulse shadow-md rounded-lg"
              ></div>
            ))}
          </>
        ) : (
          <>
            {users.map((user) => (
              <div
                key={user._id}
                className="p-2 bg-base-100 shadow-md border rounded-lg"
              >
                <h1 className="font-bold text-sm flex items-center gap-1 whitespace-nowrap">
                  {user?.firstName && user?.lastName ? (
                    <>
                      {user.firstName} {user.lastName}{" "}
                      {user.uid === userInfo?.userInfo?.uid && (
                        <span className="bg-red-500 text-white badge badge-xs">
                          YOU
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-red-700">N/A</span>
                    </>
                  )}
                </h1>
                <h1 className="text-xs font-medium">{user.email}</h1>
                <p className="text-[9px] text-gray-600">#{user.uid}</p>
                <hr className="my-1" />
                {/* STATISTICS */}
                <div className="text-[9px]">
                  <h1>Created: {user.creationTime}</h1>
                  <h1>Last Log In: {user.lastSignInTime}</h1>
                </div>
                <hr className="my-1" />
                {/* ADDRESS / ROLE */}
                <div className="flex justify-between gap-2 items-center">
                  {/* ADDRESS DROPDOWN */}
                  <div className="dropdown dropdown-bottom dropdown-start">
                    <button
                      tabIndex={0}
                      role="button"
                      disabled={user.address.length === 0 && true}
                      className={`btn bg-transparent rounded-md border-base-300 hover:bg-base-200 disabled:bg-base-300 shadow-none flex-nowrap whitespace-nowrap btn-sm xl:btn-md text-xs xl:text-sm`}
                    >
                      {user.address.length === 0 ? "N/A" : "Address"}{" "}
                      <IoMdArrowDropdown></IoMdArrowDropdown>
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[20] p-2 shadow bg-base-100 rounded-md w-fit"
                    >
                      {user?.address.map((address, index) => (
                        <li
                          key={index}
                          className="whitespace-nowrap p-1 even:bg-gray-100 rounded-md text-xs xl:text-sm"
                        >
                          <p>{address.addressLine}</p>
                          <p>
                            {address.city} {address.zip}, {address.country}
                          </p>
                          <p>{address.phone}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* ROLE UPDATE */}
                  <select
                    className={`select font-heading border-base-300 bg-transparent focus:outline-none  select-sm text-xs ${
                      user.role === "admin" && "text-red-600"
                    } ${user.role === "customer" && "text-green-600"} ${
                      user.role === "staff" && "text-blue-600"
                    }`}
                    defaultValue={user.role}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      const changed = handleChangeRole(
                        user.uid,
                        newRole,
                        `${user.firstName} ${user.lastName}`
                      );

                      if (!changed) {
                        e.target.value = user.role;
                      }
                    }}
                  >
                    <option value="admin" className="text-primary">
                      Admin
                    </option>
                    <option value="customer" className="text-primary">
                      Customer
                    </option>
                    <option value="staff" className="text-primary">
                      Staff
                    </option>
                  </select>
                </div>
              </div>
            ))}
            {5 - users.length >= 0 && (
              <>
                {[...Array(5 - users.length)].map((_, index) => (
                  <div key={index} className="h-[144.5px] w-full"></div>
                ))}
              </>
            )}
          </>
        )}

        {/* NEXT/PREV CONTROLS */}
        <div className="flex items-center justify-center flex-row-reverse md:flex-row gap-2">
          <h1 className="font-medium hidden md:block">
            {currentPage * itemsPerPage + 1}-
            {Math.min((currentPage + 1) * itemsPerPage, usersCount.count)} of{" "}
            {usersCount.count}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              className="btn bg-transparent hover:bg-transparent btn-xs md:btn-md"
            >
              <GrLinkPrevious />
            </button>
            <h1 className="w-2 text-center font-medium">{currentPage + 1}</h1>
            <button
              onClick={handleNextPage}
              className="btn bg-transparent hover:bg-transparent btn-xs md:btn-md"
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;