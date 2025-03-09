import { Request, Response } from "express";
import { PurchaseRepository } from "../repository/purchase";

// we should create a global singleton, but for I have let it be
const purchaseRepo = new PurchaseRepository();

// for now I have kept logic in the controller, but it should be moved to a service
export const getPurchases = async (req: Request, res: Response) => {
  try {
    const { username, deliveryStatus, page = 1, limit = 10, sort } = req.query;

    const query: any = {};
    if (username)
      query.username = {
        $regex: `${username?.toString().trim()}`,
        $options: "i",
      };
    if (deliveryStatus) query.deliveryStatus = deliveryStatus;

    const purchases = await purchaseRepo.find(
      query,
      Number(page),
      Number(limit),
      sort
    );
    // await new Promise((resolve, _) => {
    //   setTimeout(resolve, 2000);
    // });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchases." });
  }
};
