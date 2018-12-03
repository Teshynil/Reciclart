import { Item } from "./item";
import { Material } from "./material";

export class Transaction {
    id:number;
    quantity:number;
    weight:number;
    item:Item;
    material:Material;
    date:Date;
    total:number;
    user:object;
    itemId: number;
    transaction: number;

    /**
     * getTotal
     */
    public getTotal():number {
        return this.quantity*this.item.value;
    }
}