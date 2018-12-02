import { Component, OnInit } from '@angular/core';
declare var M:any;
@Component({
  selector: 'app-sell-office',
  templateUrl: './sell-office.component.html',
  styleUrls: ['./sell-office.component.css']
})
export class SellOfficeComponent implements OnInit {

  public item;
  public quantity;
  public total;
  public client;
  constructor() {
    this.item = this.client = '';
    this.quantity = this.total = 0;
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });
  }

  ngOnInit() {
  }

  submit(){
    console.log(this.client, this.item, this.quantity);
    this.total = this.quantity*20;
    console.log(this.total);
  }

}
