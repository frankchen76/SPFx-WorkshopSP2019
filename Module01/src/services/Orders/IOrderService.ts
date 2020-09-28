import { IOrder } from "./IOrder";

export interface IOrderService {
  getOrders(): Promise<IOrder[]>;
}
