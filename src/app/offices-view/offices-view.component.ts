import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Office } from '../models/office';
import { of } from 'rxjs';

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
currentOffice : Office;
value : any;
offices: Office[];
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
  "Zacatecas" : "32"} ;
    addOfficeForm = new FormGroup({
        schedule: new FormGroup({
            lu: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ma: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            mi: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            ju: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            vi: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            sa: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            }),
            do: new FormGroup({
                init: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")]),
                end: new FormControl('',[Validators.required,Validators.pattern("[0-9]{1,2}:[0-9]{2}")])
            })
        }),
        address: new FormGroup({
            city: new FormControl('',[Validators.required]),
            township: new FormControl('',[Validators.required]),
            street: new FormControl('',[Validators.required]),
            number: new FormControl(''),
            cp: new FormControl('',[Validators.required])
        }),
        data: new FormGroup({
            email: new FormControl('',[Validators.required,Validators.email]),
            password: new FormControl('',[Validators.required]),
        })
    },{updateOn:"submit"});
    constructor(private authService: AuthService, private router: Router, private api: APIService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems);
            elems = document.querySelectorAll('.tooltipped');
            instances = M.Tooltip.init(elems);
            elems = document.querySelectorAll('.modal');
            instances = M.Modal.init(elems);
            elems = document.querySelectorAll('.timepicker');
            instances = M.Timepicker.init(elems, { 'twelveHour': false, 'container': 'body'});
            elems = document.querySelectorAll('select');
            instances = M.FormSelect.init(elems);
        });
        this.api.getOffices().subscribe(result => {
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
        error=this.review(this.addOfficeForm.controls);
        if(error) return false;

        let noffice:Office;
        noffice=new Office();
        noffice=this.addOfficeForm.value;
        return false;
    }
  getCurrentOffice(office : Office){
    this.currentOffice = office;
    this.lat = office.point.lat;
    this.lng = office.point.long;
    this.point = {
      lat: office.point.lat,
      lng: office.point.long,
      draggable: true
    };
    this.zoom = 14;
    this.value = this.states[office.address.city];
    console.log(office);
    
  }

  editOffice(){
    let error = false;
        error=this.review(this.addOfficeForm.controls);
        if(error) return false;

        let noffice:Office;
        noffice=new Office();
        noffice=this.addOfficeForm.value;
        console.log(noffice);
        //console.log(eoffice);

  }


    review(obj:Object,name:string="Formulario"){
        
        let err=false;
        for(var control in obj){
            if(obj.hasOwnProperty(control)){
                if(obj[control] instanceof FormGroup){
                    if(this.review(obj[control].controls,control)==true){
                        err=true;
                    }
                }else if(obj[control] instanceof FormControl){
                    if(!obj[control].valid){
                        M.toast({ html: name+" > "+control+" Datos Invalidos" });
                        err=true;
                    }
                }
            }
        }
        return err;
    }
}
