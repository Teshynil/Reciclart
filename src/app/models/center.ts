import { Adress } from "./adress";
import { Schedule } from "./schedule";
import { Point } from "./point";
import { MaterialPerCenter } from "./material-per-center";
import { Type } from "class-transformer/decorators";

export class Center {
    id:number;
    schedule:Schedule;
    point:Point;
    name:string;
    logo:string;
    address:Adress;
    @Type(() => MaterialPerCenter)
    materials:MaterialPerCenter[];
}
