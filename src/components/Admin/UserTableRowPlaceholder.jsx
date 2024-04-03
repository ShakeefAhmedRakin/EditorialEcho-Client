const UserTableRowPlaceholder = () => {
  return (
    <tr className="grid grid-cols-6 gap-2 p-4 even:bg-base-100">
      <td className="col-span-2 bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
      <td className="bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
      <td className="col-span-2 bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
      <td className="bg-base-300 animate-pulse h-[62px] xl:h-[82px] rounded-lg"></td>
    </tr>
  );
};

export default UserTableRowPlaceholder;
