import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

declare var M:any;
@Component({
  selector: 'app-offices-view',
  templateUrl: './offices-view.component.html',
  styleUrls: ['./offices-view.component.css']
})
export class OfficesViewComponent implements OnInit {

  transaciones: object;
  test: any;
  constructor(private authService: AuthService, private router: Router, private api: APIService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.fixed-action-btn');
      var instances = M.FloatingActionButton.init(elems);
      var elems = document.querySelectorAll('.tooltipped');
      var instances = M.Tooltip.init(elems);
      this.api.getTransactions().subscribe(res => {
        this.setTransactions(res);
      }
      );
    });
  }

}
