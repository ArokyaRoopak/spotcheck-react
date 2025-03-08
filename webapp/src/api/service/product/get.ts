import { Api } from "../..";
import { CustomError } from "../../util/custom-error";

export interface IPurchase {
  id: string;
  username: string;
  productName: string;
  productCount: number;
  purchaseAmount: number;
  deliveryStatus: "pending" | "shipped" | "delivered" | "canceled";
  createdAt: string;
}

export interface IPurchaseResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: IPurchase[];
}

export const getPurchases = async ({
  username,
  deliveryStatus,
  page,
  limit,
}: {
  username?: string;
  deliveryStatus?: string;
  page?: number;
  limit?: number;
}): Promise<{ response?: IPurchaseResponse; error?: CustomError }> => {
  try {
    const params = new URLSearchParams();
    if (username) params.append("username", username);
    if (deliveryStatus) params.append("deliveryStatus", deliveryStatus);
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const response = await Api.getInstance().get<IPurchaseResponse>(
      `purchases?${params.toString()}`
    );
    return { response };
  } catch (error) {
    return { error: error as CustomError };
  }
};
