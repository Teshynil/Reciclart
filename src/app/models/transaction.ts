import { Item } from "./item";

export class Transaction {
    id:number;
    quantity:number;
    item:Item;
    itemId: number;
    transaction: number;

    /**
     * getTotal
     */
    public getTotal():number {
        return this.quantity*this.item.value;
    }
}