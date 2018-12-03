import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    transacciones: any;
    total : number = 0;
    constructor(private authService:AuthService,private router:Router,private api:APIService) {
      if(!this.authService.isLoggedIn() && authService.getTipo()=="center"){
        this.router.navigate(['/login']);
      }
    }
  
    ngOnInit() {
      this.api.getCenterTransactions().subscribe(result => {
        this.transacciones=result.reverse().slice(0,4);
        for(let trans of this.transacciones ){
          this.total += trans.total;
        }
        
      },
        error => {
          console.log(<any>error);
        }
      );
    }

}
