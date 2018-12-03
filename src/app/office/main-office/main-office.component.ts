import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';

@Component({
  selector: 'app-main-office',
  templateUrl: './main-office.component.html',
  styleUrls: ['./main-office.component.css']
})
export class MainOfficeComponent implements OnInit {

  transacciones: any;
  total : number = 0;
  constructor(private authService:AuthService,private router:Router,private api:APIService) {
    if(!this.authService.isLoggedIn() && authService.getTipo()=="office"){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.api.getOfficeTransactions().subscribe(result => {
      this.transacciones=result.reverse().slice(0,4);
      for(let trans of this.transacciones ){
        this.total += trans.getTotal();
      }
      
    },
      error => {
        console.log(<any>error);
      }
    );
  }

}
