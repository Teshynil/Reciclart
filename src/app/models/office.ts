import {Type} from "class-transformer";
import { Item } from "./item";
import { Point } from "./point";
import { Schedule } from "./schedule";

export class Office {
    id:string;
    schedule:Schedule;
    point:Point;
    @Type(() => Item)
    items:Item[];
}
