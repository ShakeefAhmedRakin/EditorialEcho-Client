import { useEffect, useState } from "react";
import useGetUsersCount from "../../../../hooks/useGetUsersCount";
import useGetUsers from "../../../../hooks/useGetUsers";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import UserTableRow from "../../../../components/Admin/UserTableRow";
import UserTableRowPlaceholder from "../../../../components/Admin/UserTableRowPlaceholder";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import UserTableCardMobile from "../../../../components/Admin/UserTableCardMobile";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  // FILTER USE STATES
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const axiosSecure = useAxiosSecure();

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
      <Helmet>
        <title>StreetWise | Manage Users</title>
      </Helmet>
      <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="500">
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
                {Math.min((currentPage + 1) * itemsPerPage, usersCount.count)}{" "}
                of {usersCount.count}
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  className="btn bg-transparent hover:bg-transparent btn-xs md:btn-md"
                >
                  <GrLinkPrevious />
                </button>
                <h1 className="w-2 text-center font-medium">
                  {currentPage + 1}
                </h1>
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
        <div className="h-[564px] xl:h-[670px] overflow-y-auto hidden md:block">
          <table className="w-full">
            <tbody className="w-full">
              {countLoading || usersLoading || isRefetchingUsers ? (
                <>
                  {[...Array(6)].map((_, index) => (
                    <UserTableRowPlaceholder
                      key={index}
                    ></UserTableRowPlaceholder>
                  ))}
                </>
              ) : (
                <>
                  {users.map((user) => (
                    <UserTableRow
                      user={user}
                      key={user._id}
                      refetchUsers={refetchUsers}
                      handleChangeRole={handleChangeRole}
                    ></UserTableRow>
                  ))}
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
                <UserTableCardMobile
                  user={user}
                  key={user._id}
                  handleChangeRole={handleChangeRole}
                ></UserTableCardMobile>
              ))}
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
      </div>
    </>
  );
};

export default ManageUsers;
