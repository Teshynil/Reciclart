import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    window.location.href="/login";
  }
}
