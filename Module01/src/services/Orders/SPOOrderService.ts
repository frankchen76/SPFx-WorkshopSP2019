import { IOrderService } from "./IOrderService";
import "@pnp/polyfill-ie11";
import { sp } from "@pnp/sp";
import { IOrder } from "./IOrder";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class SPOOrderService implements IOrderService {
  private _listName = "Orders";
  constructor(private context: WebPartContext) {

  }

  public getOrders(): Promise<IOrder[]> {
    return sp.web.lists.getByTitle(this._listName).items.get();
    //return new Array<IOrder>();
    // return new Promise((resolve, reject) => {
    //   resolve(new Array<IOrder>());
    // });
  }
}
