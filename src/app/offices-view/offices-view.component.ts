import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl } from '@angular/forms';

declare var M:any;
@Component({
  selector: 'app-offices-view',
  templateUrl: './offices-view.component.html',
  styleUrls: ['./offices-view.component.css']
})
export class OfficesViewComponent implements OnInit {
  lat: number = 19.4978;
  lng: number = -99.1269;
  zoom: number = 4;
  offices: any;
  point: Object = {
    lat: 19.4978,
    lng: -99.1269,
    draggable: true
  };
  addOfficeForm = new FormGroup({
    schedule : new FormGroup({
      lu : new FormGroup({
        init : new FormControl(''),
        end : new FormControl('')
      }),
      ma: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      }),
      mi: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      }),
      ju: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      }),
      vi: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      }),
      sa: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      }),
      do: new FormGroup({
        init: new FormControl(''),
        end: new FormControl('')
      })
    }),
    address : new FormGroup({
      city : new FormControl(''),
      township : new FormControl(''),
      street : new FormControl(''),
      number : new FormControl(''),
      cp : new FormControl('')
    }),
    data: new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  });
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
      instances = M.Timepicker.init(elems, {'twelveHour': false , 'container' : 'body'});
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

  onSubmit(){
    console.log("hola");
  }


}
