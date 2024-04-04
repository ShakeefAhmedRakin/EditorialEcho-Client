import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useGetProducts from "../../../../hooks/useGetProducts";
import useGetProductsCount from "../../../../hooks/useGetProductsCount";
import { useEffect, useState } from "react";
import ProductTableRow from "../../../../components/Admin/ProductTableRow";
import ProductTableRowPlaceholder from "../../../../components/Admin/ProductTableRowPlaceholder";

const ManageProducts = () => {
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // FETCHING DATA
  const { productsCount, countLoading, refetchCount } = useGetProductsCount({
    filter,
    searchName,
  });

  const { products, productsLoading, refetchProducts, isRefetchingProducts } =
    useGetProducts({
      filter,
      currentPage,
      itemsPerPage,
      searchName,
    });

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
    refetchProducts();
  }, [refetchProducts, filter, currentPage, itemsPerPage, searchName]);

  // ------------- PAGINATION -------------
  const numberOfPages = Math.ceil(productsCount.count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div
      className="min-h-full h-full font-heading"
      data-aos="fade-up"
      data-aos-delay="0"
      data-aos-duration="500"
    >
      {/* PAGINATION FUNCTIONS */}
      <div className="flex flex-col md:flex-row items-start gap-2 font-medium">
        {/* FILTER/SORT BY */}
        <div className="w-fit space-y-2">
          {/* FILTER */}
          <div className="flex items-center gap-2 w-full whitespace-nowrap">
            <p>Filters:</p>
            <select
              className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none w-full select-sm md:select-md"
              onChange={(e) => {
                if (e.target.value === "") {
                  setFilter("");
                } else {
                  setFilter(e.target.value === "draft");
                }
              }}
            >
              <option value="">All</option>
              <option value="draft">Draft</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
          {/* SORT BY */}
          <div className="flex items-center gap-2 w-full whitespace-nowrap">
            <p>Sort By:</p>
            <select className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none w-full select-sm md:select-md">
              <option value="asc-mod">Modified (Asc)</option>
              <option value="desc-mod">Modified (Desc)</option>
              <option value="asc-create">Created (Asc)</option>
              <option value="desc-create">Created (Desc)</option>
            </select>
          </div>
        </div>
        {/* SEARCH */}
        <div className="flex-1 w-full">
          <input
            type="text"
            className="max-w-md w-full rounded-lg bg-base-200 outline-none text-sm p-3 md:text-base"
            placeholder="Search..."
            onChange={(e) => {
              const regex = /^[a-zA-Z\s]*$/;
              if (regex.test(e.target.value)) {
                setCurrentPage(0);
                setSearchName(e.target.value);
              }
            }}
            value={searchName}
          />
        </div>
        {/* NEXT/PREV BUTTONS */}
        <div className="flex-1 flex flex-col-reverse md:flex-col items-center w-full md:items-end gap-3">
          {/* NEXT/PREV CONTROLS */}
          <div className="flex items-center flex-row-reverse md:flex-row gap-2">
            <h1 className="font-medium hidden md:block">
              {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage, productsCount.count)}{" "}
              of {productsCount.count}
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
          <div className="items-center gap-2 font-medium flex text-xs flex-row-reverse">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="select font-heading border-base-300 bg-transparent text-primary focus:outline-none select-sm md:select-md"
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
      <hr className="my-2" />
      {/* TABLET TO LARGE DEVICES */}
      <div className="h-[564px] xl:h-[670px] overflow-y-auto hidden md:block">
        <table className="w-full">
          {isRefetchingProducts || productsLoading || countLoading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <ProductTableRowPlaceholder
                  key={index}
                ></ProductTableRowPlaceholder>
              ))}
            </>
          ) : (
            <>
              {products.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                ></ProductTableRow>
              ))}
            </>
          )}
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
