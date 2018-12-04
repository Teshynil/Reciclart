import {Type} from "class-transformer";
import { Item } from "./item";
import { Point } from "./point";
import { Schedule } from "./schedule";
import { Adress } from "./adress";

export class Office {
    id:string;
    schedule:Schedule;
    point:Point;
    @Type(() => Item)
    items:Item[];
    address : Adress;
}
