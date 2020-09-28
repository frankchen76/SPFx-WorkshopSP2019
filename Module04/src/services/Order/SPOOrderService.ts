import { IOrder } from "./IOrder";
import { IOrderService } from "./IOrderService";
import { sp } from '@pnp/sp';

export class SPOOrderService implements IOrderService {
  private _listTitle = "Orders";
  public getOrders(): Promise<IOrder[]> {
    return sp.web.lists.getByTitle(this._listTitle).items.get();
  }

}
