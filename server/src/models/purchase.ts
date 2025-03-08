import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
  username: string;
  productName: string;
  productCount: number;
  purchaseAmount: number;
  deliveryStatus: "pending" | "shipped" | "delivered" | "canceled";
}

const PurchaseSchema = new Schema<IPurchase>(
  {
    username: { type: String, required: true, index: true }, // Indexed for search
    productName: { type: String, required: true },
    productCount: { type: Number, required: true, min: 1 },
    purchaseAmount: { type: Number, required: true, min: 0 },
    deliveryStatus: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const PurchaseModel = mongoose.model<IPurchase>(
  "Purchase",
  PurchaseSchema
);
