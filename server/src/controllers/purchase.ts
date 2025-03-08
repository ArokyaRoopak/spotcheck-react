import { Request, Response } from "express";
import { PurchaseRepository } from "../repository/purchase";
import { IPurchase } from "../models/purchase"; // Adjust the import path as necessary

const purchaseRepo = new PurchaseRepository();

// export const createPurchase = async (req: Request, res: Response) => {
//   try {
//     const {
//       username,
//       productName,
//       productCount,
//       purchaseAmount,
//       deliveryStatus,
//     } = req.body;

//     // Validate input
//     if (!username || !productName || !productCount || !purchaseAmount) {
//       return res.status(400).json({ error: "All fields are required." });
//     }

//     // Validate productCount
//     if (typeof productCount !== "number" || productCount <= 0) {
//       return res
//         .status(400)
//         .json({ error: "Product count must be a positive number." });
//     }

//     // Create a purchase record
//     const newPurchase: IPurchase = {
//       username,
//       productName,
//       productCount,
//       purchaseAmount,
//       deliveryStatus: deliveryStatus || "pending", // Default to "pending"
//       // Add any other required properties from IPurchase here
//     };

//     // Save the purchase record
//     const savedPurchase = await purchaseRepo.save(newPurchase);

//     res.status(201).json(savedPurchase);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create purchase." });
//   }
// };

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
