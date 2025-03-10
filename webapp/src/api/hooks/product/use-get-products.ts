import { useState, useCallback } from "react";
import {
  getPurchases,
  IPurchase,
  IPurchaseResponse,
} from "../../service/product/get";

export function usePurchases() {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Fetch purchases with filters
  const fetchPurchases = useCallback(
    async (filters: {
      username?: string;
      deliveryStatus?: string;
      page?: number;
      limit?: number;
    }) => {
      setLoading(true);
      setError(undefined);
      const { response, error } = await getPurchases(filters);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);

      if (error) {
        setError("Failed to fetch purchases.");
        return;
      }

      if (response) {
        setPurchases(response.data);
        setPagination({
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        });
      }
    },
    []
  );

  return {
    purchases,
    loading,
    error,
    pagination,
    fetchPurchases,
  };
}
