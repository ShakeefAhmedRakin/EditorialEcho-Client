const ProductTableRowPlaceholder = () => {
  return (
    <tr className="even:bg-[#F9F9F9] animate-pulse">
      <td className="w-28 p-2">
        <div className="w-28 h-[96px] rounded-md bg-base-300" />
      </td>
      {/* PRODUCT DETAILS */}
      <td className="p-2">
        <div className="rounded-md bg-base-300 h-[96px]" />
      </td>
      {/* STOCK */}
      <td className="p-2">
        <div className="rounded-md bg-base-300 h-[96px]" />
      </td>
      {/* PRICE */}
      <td className="p-2">
        <div className="rounded-md bg-base-300 h-[96px]" />
      </td>
      {/* REVENUE */}
      <td className="p-2">
        <div className="rounded-md bg-base-300 h-[96px]" />
      </td>
      {/* BUTTONS */}
      <td className="p-2 w-24">
        <div className="rounded-md bg-base-300 h-[96px]" />
      </td>
    </tr>
  );
};

export default ProductTableRowPlaceholder;
