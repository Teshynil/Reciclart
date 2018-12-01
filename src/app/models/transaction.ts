import { Item } from "./item";

export class Transaction {
    id:string;
    quantity:number;
    item:Item;

    /**
     * getTotal
     */
    public getTotal():number {
        return this.quantity*this.item.value;
    }
}