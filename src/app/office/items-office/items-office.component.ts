import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { Item } from 'src/app/models/item';
import { Office } from 'src/app/models/office';

@Component({
  selector: 'app-items-office',
  templateUrl: './items-office.component.html',
  styleUrls: ['./items-office.component.css']
})
export class ItemsOfficeComponent implements OnInit {
  public items:Item[];
  constructor(private authService:AuthService,private router:Router,private api:APIService) {
    if(!this.authService.isLoggedIn() && authService.getTipo()=="office"){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.api.getMyOffice().subscribe(
      (res:Office[])=>{
        this.items=res[0].items;
      }
    );
  }

}
