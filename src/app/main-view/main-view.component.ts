import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
