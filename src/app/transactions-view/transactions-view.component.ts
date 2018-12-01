import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { APIService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transactions-view',
  templateUrl: './transactions-view.component.html',
  styleUrls: ['./transactions-view.component.css']
})
export class TransactionsViewComponent implements OnInit {
  transactions: any;
  test: any;
  constructor(private authService: AuthService, private router: Router, private api: APIService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.api.getTransactions().subscribe(result => {
      this.transactions = result;
      console.log(result);
    },
      error => {
        console.log(<any>error);
      }
    );
  }
  setTransactions(value) {
    this.transactions = value;
  }

}
