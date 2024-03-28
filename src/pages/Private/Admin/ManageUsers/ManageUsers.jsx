import { useEffect, useState } from "react";
import useGetUsersCount from "../../../../hooks/useGetUsersCount";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const ManageUsers = () => {
  // FILTER USE STATES
  const [filter, setFilter] = useState("");

  // FETCHING DATA
  const { usersCount, countLoading, refetchCount } = useGetUsersCount({
    filter,
  });

  // ------------- PAGINATION --------------
  // STATES
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numberOfPages = Math.ceil(usersCount.count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // FUNCTIONS
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

  // REFETCH
  useEffect(() => {
    refetchCount();
  }, [refetchCount]);

  return (
    <>
      {/* FILTER / SEARCH */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex items-center gap-2 font-medium">
          <p>Filters</p>
          <select className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none w-full md:w-fit">
            <option value="">None</option>
            <option value="admin">Only Admin</option>
            <option value="customer">Only Customer</option>
            <option value="staff">Only Staff</option>
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="max-w-md w-full rounded-lg bg-base-200 outline-none p-3"
            placeholder="Search By Name"
          />
        </div>
        <div className="flex-1 flex justify-start md:justify-end items-center">
          {/* NEXT/PREV CONTROLS */}
          <div className="flex items-center flex-row-reverse md:flex-row gap-2">
            <h1 className="font-medium">
              {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage, usersCount.count)} of{" "}
              {usersCount.count}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                className="btn bg-transparent hover:bg-transparent"
              >
                <GrLinkPrevious />
              </button>
              <h1 className="w-2 text-center font-medium">{currentPage + 1}</h1>
              <button
                onClick={handleNextPage}
                className="btn bg-transparent hover:bg-transparent"
              >
                <GrLinkNext />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* PER PAGE DROPDOWN */}
      <div className="flex items-center gap-2 mt-2 font-medium">
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
    </>
  );
};

export default ManageUsers;
