import { useState, useEffect } from "react";
import { usePurchases } from "../../../api/hooks/product/use-get-products";
import { IPurchase } from "../../../api/service/product/get";
import CustomDropdown from "../../../components/custom-dropdown";

const PurchaseTable = () => {
  const { purchases, pagination, loading, fetchPurchases } = usePurchases();
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPurchases({ username: search, page, limit: pageSize });
  }, [search, page, pageSize]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 sm:p-7">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <h2 className="text-lg font-semibold">
          Purchases ({pagination.total})
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm"
          />
          {/* <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded-lg px-3 py-1 text-sm"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select> */}
          <CustomDropdown
            options={["5", "10", "20", "50"]}
            selectedOption={pageSize.toString()}
            onOptionSelect={(val) => setPageSize(parseInt(val))}
          />
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full  border border-separate rounded-md border-gray-300 ">
          <thead className="bg-cyan-800/20 rounded-md">
            <tr>
              {[
                "Username",
                "Product Name",
                "Count",
                "Amount",
                "Status",
                "Date",
              ].map((col) => (
                <th
                  key={col}
                  className=" border-green-500 px-4 py-2 text-left font-medium rounded-md text-gray-700 "
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <tr key={index} className="h-6 sm:h-10  rounded-md">
                  <td
                    colSpan={6}
                    className="text-center border px-4 py-2 animate-pulse "
                  >
                    <div className="shimmer-placeholder" />
                  </td>
                </tr>
              ))
            ) : purchases.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No purchases found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase: IPurchase, index) => (
                <tr
                  key={purchase.id}
                  className={`hover:bg-gray-100 h-6 sm:h-10 rounded-md text-sm sm:text-base ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    {purchase.username}
                  </td>
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    {purchase.productName}
                  </td>
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    {purchase.productCount}
                  </td>
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    ${purchase.purchaseAmount}
                  </td>
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    {purchase.deliveryStatus}
                  </td>
                  <td className=" px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                    {new Date(purchase.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, pagination.totalPages))
            }
            disabled={page >= pagination.totalPages}
            className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTable;
