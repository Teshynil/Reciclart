import {Type} from "class-transformer";
import { Item } from "./item";

export class Office {
    id:string;
    schedule:object[];
    point:object[];
    @Type(() => Item)
    items:Item[];
    address : object[];
}
