import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { APIService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

declare var M:any;
@Component({
  selector: 'app-offices-view',
  templateUrl: './offices-view.component.html',
  styleUrls: ['./offices-view.component.css']
})
export class OfficesViewComponent implements OnInit {¿
  offices: any;
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
   
  }


}
