import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Item } from 'src/app/models/item';
import { APIService } from 'src/app/api.service';
import { Office } from 'src/app/models/office';
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
  public items:Item[];
  constructor(private api:APIService) {
    this.item = this.client = '';
    this.quantity = this.total = 0;
  }

  ngOnInit() {
    this.api.getMyOffice().subscribe(
      (res:Office[])=>{
        this.items=res[0].items;
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
      }
    );
  }
  
  submit(){
    this.api.getAccountId(this.client).subscribe(
      (userId:string)=>this.api.postOfficeSale(userId,this.items[this.item],this.quantity).subscribe(
        ()=>
        M.toast({html: 'Venta realizada'}),
        (error:string)=>
        M.toast({html: error})
      ),
      (text)=>M.toast({html: 'Usuario invalido'})
    );
    return false;
  }
  getTotal(){
    if(this.item!=='')
      this.total=this.quantity*this.items[this.item].value;
  }
}
