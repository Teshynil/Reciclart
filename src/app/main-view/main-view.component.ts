import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { EnterpriseService } from '../enterprise.service';
import { debug, log } from 'util';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private enterpriseService:EnterpriseService) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    console.log(enterpriseService.getMyEnterprise());
  }

  ngOnInit() {
  }

}
