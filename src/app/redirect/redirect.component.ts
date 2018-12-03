import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      switch (authService.getTipo()) {
        case "enterprise":
        this.router.navigate(['/main']);
        break;
          case "office":
          this.router.navigate(['/office/main']);
        break;
        case "center":
        this.router.navigate(['/center/main']);
        break;
      }
    }
  }

  ngOnInit() {
  }

}
