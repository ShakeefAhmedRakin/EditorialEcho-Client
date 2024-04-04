import { IoMdArrowDropdown } from "react-icons/io";
import useUserInfo from "../../hooks/useUserInfo";
import PropTypes from "prop-types";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  } ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;

  return formattedDate;
}

const UserTableRow = ({ user, handleChangeRole }) => {
  const { userInfo } = useUserInfo();

  return (
    <tr className="grid grid-cols-6 gap-2 p-4 even:bg-[#F9F9F9] rounded-lg">
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
        <h1 className="text-gray-600 text-xs xl:text-base">{user.email}</h1>
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
          <span className="font-semibold flex items-center gap-x-1">
            Account Created <span className="text-[9px]">(UTC)</span>
          </span>
          {formatTimestamp(user.creationTime)}
        </h1>
        <h1>
          <span className="font-semibold flex items-center gap-x-1">
            Last Log In <span className="text-[9px]">(UTC)</span>
          </span>
          {formatTimestamp(user.lastSignInTime)}
        </h1>
      </td>
      {/* ACTIONS */}
      <td className="text-right">
        <select
          className={`select font-heading border-base-300 bg-transparent focus:outline-none md:w-fit select-xs text-xs xl:select-md xl:text-sm ${
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
  );
};

UserTableRow.propTypes = {
  user: PropTypes.object,
  handleChangeRole: PropTypes.func,
};

export default UserTableRow;
