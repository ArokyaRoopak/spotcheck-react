import { PurchaseModel, IPurchase } from "../models/purchase";
import { BaseRepository } from "./base";

export class PurchaseRepository extends BaseRepository<IPurchase> {
  constructor() {
    super(PurchaseModel);
  }
}
