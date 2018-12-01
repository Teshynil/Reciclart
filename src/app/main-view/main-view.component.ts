import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { NgForOf } from "@angular/common";
import { APIService } from '../api.service';
import { debug, log } from 'util';
import { LoginComponent } from '../login/login.component';
import { Transaction } from '../models/transaction';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { plainToClass,classToPlain } from "class-transformer";
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  transaciones:object;
  test:any;
  constructor(private authService:AuthService,private router:Router,private api:APIService) {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.api.getTransactions().subscribe(res=>{
      this.setTransactions(res);
      }
    );
  }
  setTransactions(value){
    this.transaciones=value;
  }

}
