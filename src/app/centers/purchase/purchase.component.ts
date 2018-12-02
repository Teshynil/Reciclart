import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
declare var M:any;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public material;
  public quantity;
  public total;
  public client;
  constructor() {
    this.material = this.client = '';
    this.quantity = this.total = 0;
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });
  }

  ngOnInit() {
  }

  submit(){
    console.log(this.client, this.material, this.quantity);
    this.total = this.quantity*20;
    console.log(this.total);
  }
  

}


