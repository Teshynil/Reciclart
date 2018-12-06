import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Office } from '../models/office';
import { of } from 'rxjs';
import { Item } from '../models/item';
import { ClassTransformer, classToClass, classToClassFromExist } from 'class-transformer';

declare var M: any;
@Component({
    selector: 'app-offices-view',
    templateUrl: './offices-view.component.html',
    styleUrls: ['./offices-view.component.css']
})
export class OfficesViewComponent implements OnInit {
    lat: number = 19.4978;
    lng: number = -99.1269;
    zoom: number = 4;
    currentOffice: Office;
    value: any;
    offices: any;
    point: Object = {
        lat: 19.4978,
        lng: -99.1269,
        draggable: true
    };
    states: Object = {
        "Aguascalientes": "1",
        "Baja California": "2",
        "Baja California Sur": "3",
        "Campeche": "4",
        "Coahuila de Zaragoza": "5",
        "Colima": "6",
        "Chiapas": "7",
        "Chihuahua": "8",
        "Distrito Federal": "9",
        "Durango": "10",
        "Guanajuato": "11",
        "Guerrero": "12",
        "Hidalgo": "13",
        "Jalisco": "14",
        "México": "15",
        "Michoacán de Ocampo": "16",
        "Morelos": "17",
        "Nayarit": "18",
        "Nuevo León": "19",
        "Oaxaca": "20",
        "Puebla": "21",
        "Querétaro": "22",
        "Quintana Roo": "23",
        "San Luis Potosí": "24",
        "Sinaloa": "25",
        "Sonora": "26",
        "Tabasco": "27",
        "Tamaulipas": "28",
        "Tlaxcala": "29",
        "Veracruz de Ignacio de la Llave": "30",
        "Yucatán": "31",
        "Zacatecas": "32"
    };
    addOfficeForm = new FormGroup({
        schedule: new FormGroup({
            lu: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ma: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            mi: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ju: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            vi: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            sa: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            do: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            })
        }),
        address: new FormGroup({
            city: new FormControl('', [Validators.required]),
            township: new FormControl('', [Validators.required]),
            street: new FormControl('', [Validators.required]),
            number: new FormControl(''),
            pc: new FormControl('', [Validators.required])
        }),
        data: new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        })
    }, { updateOn: "submit" });

    editOfficeForm = new FormGroup({
        schedule: new FormGroup({
            lu: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ma: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            mi: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ju: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            vi: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            sa: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            do: new FormGroup({
                init: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('', [Validators.required, Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            })
        }),
        address: new FormGroup({
            city: new FormControl('', [Validators.required]),
            township: new FormControl('', [Validators.required]),
            street: new FormControl('', [Validators.required]),
            number: new FormControl(''),
            pc: new FormControl('', [Validators.required])
        }),
        data: new FormGroup({
            password: new FormControl(''),
        })
    }, { updateOn: "submit" });

    addItemForm = new FormGroup({
        data: new FormGroup({
            name: new FormControl('', [Validators.required]),
            value: new FormControl('', [Validators.required])
        })
    }, { updateOn: "submit" });

    constructor(private authService: AuthService, private router: Router, private api: APIService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems);
        elems = document.querySelectorAll('.tooltipped');
        instances = M.Tooltip.init(elems);
        elems = document.querySelectorAll('.modal');
        instances = M.Modal.init(elems);
        elems = document.querySelectorAll('.timepicker');
        instances = M.Timepicker.init(elems, { 'twelveHour': false, 'container': 'body' });
        elems = document.querySelectorAll('.material-select');
        instances = M.FormSelect.init(elems);

        this.api.getOfficesAndItems().subscribe(result => {
            this.offices = result;
            console.log(result);
        },
            error => {
                console.log(<any>error);
            }
        );
        this.setCurrentPosition();
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    mapClicked($event: MouseEvent) {
        this.point = {
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
        };
        this.zoom = 13;
    }

    onSubmit() {
        let error = false;
        error = this.review(this.addOfficeForm.controls);
        if (error) return false;

        let noffice: Office;
        noffice = new Office();
        noffice = this.addOfficeForm.value;
        return false;
    }

    onSubmitItem() {
        let error = false;
        console.log(this.addItemForm.value.data.name);
        console.log(this.addItemForm.value.data.value);
        error = this.review(this.addItemForm.controls);
        if (error) return false;

        let noitem: Item;
        noitem = new Item();
        noitem.name = this.addItemForm.value.data.name;
        try {
            noitem.value = Number(this.addItemForm.value.data.value);
        }
        catch
        {
            return false;
        }
        noitem.officesId = this.currentOffice.id;
        this.api.addItem(noitem).subscribe(
            () => {
                M.toast({ html: "El producto fue añadido" });
                this.addItemForm.reset();
                document.getElementById("addItem").M_Modal.close();
                return true;
            },
            () => {
                M.toast({ html: "Hubo un error" });
            }
        );
        return false;
    }

    openAddItem(officeId: string) {
        this.api.getOfficesAndItems().subscribe(result => {
            this.offices = result;
            this.currentOffice = classToClass(this.offices[this.offices.findIndex((e) => e.id == officeId)]);
            console.log(this.editOfficeForm.value);
            document.getElementById("addItem").M_Modal.open();
        },
            error => {
                console.log(<any>error);
            }
        );
    }

    openEditOffice(officeId: string) {
        this.api.getOfficesAndItems().subscribe(result => {
            this.offices = result;
            this.currentOffice = classToClass(this.offices[this.offices.findIndex((e) => e.id == officeId)]);
            this.currentOffice["data"]={email:"",password:""};
            let slu=this.currentOffice.schedule.lu.toString().split("–");
            let sma=this.currentOffice.schedule.ma.toString().split("–");
            let smi=this.currentOffice.schedule.mi.toString().split("–");
            let sju=this.currentOffice.schedule.ju.toString().split("–");
            let svi=this.currentOffice.schedule.vi.toString().split("–");
            let ssa=this.currentOffice.schedule.sa.toString().split("–");
            let sdo=this.currentOffice.schedule.do.toString().split("–");

            this.currentOffice.schedule["lu"]={init:slu[0],end:slu[1]};
            this.currentOffice.schedule["ma"]={init:sma[0],end:sma[1]};
            this.currentOffice.schedule["mi"]={init:smi[0],end:smi[1]};
            this.currentOffice.schedule["ju"]={init:sju[0],end:sju[1]};
            this.currentOffice.schedule["vi"]={init:svi[0],end:svi[1]};
            this.currentOffice.schedule["sa"]={init:ssa[0],end:ssa[1]};
            this.currentOffice.schedule["do"]={init:sdo[0],end:sdo[1]};
            this.editOfficeForm.patchValue(this.currentOffice);
            this.editOfficeForm.updateValueAndValidity();
            console.log(this.editOfficeForm.value);
            this.lat = this.currentOffice.point.lat;
            this.lng = this.currentOffice.point.long;
            this.point = {
                lat: this.lat,
                lng: this.lng,
                draggable: true
            };
            this.zoom = 14;
            this.value = this.states[this.currentOffice.address.city];
            console.log(this.currentOffice);
            document.getElementById("editOffice").M_Modal.open();
        },
            error => {
                console.log(<any>error);
            }
        );
    }

    editOffice() {
        let error = false;
        console.log(this.editOfficeForm.value);
        error = this.review(this.editOfficeForm.controls);
        if (error) return false;

        let noffice: Office;
        noffice = new Office();
        noffice = this.editOfficeForm.value;
        console.log(noffice);
        //console.log(eoffice);

    }


    review(obj: Object, name: string = "Formulario") {

        let err = false;
        for (var control in obj) {
            if (obj.hasOwnProperty(control)) {
                if (obj[control] instanceof FormGroup) {
                    if (this.review(obj[control].controls, control) == true) {
                        err = true;
                    }
                } else if (obj[control] instanceof FormControl) {
                    if (!obj[control].valid) {
                        M.toast({ html: name + " > " + control + " Datos Invalidos" });
                        err = true;
                    }
                }
            }
        }
        return err;
    }

    info(item: Item) {
        this.api.deleteItem(item).subscribe(
            () => {
                this.currentOffice.items.splice(this.currentOffice.items.findIndex((e) => e.id == item.id), 1);
                M.toast({ html: "El producto fue eliminado" });
                return false;
            },
            () => {
                M.toast({ html: "Hubo un error" });
            }
        );
    }
}
