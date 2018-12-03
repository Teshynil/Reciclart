import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { Item } from 'src/app/models/item';
import { Transaction } from 'src/app/models/transaction';
declare var M: any;
@Component({
  selector: 'app-transactions-office',
  templateUrl: './transactions-office.component.html',
  styleUrls: ['./transactions-office.component.css']
})
export class TransactionsOfficeComponent implements OnInit,AfterContentChecked {
  public items:Item[];
  constructor(private authService: AuthService, private router: Router, private api: APIService) {
    if (!this.authService.isLoggedIn() && authService.getTipo() == "office") {
      this.router.navigate(['/login']);
    }
  }
  ngAfterContentChecked(){
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{accordion:true});
  }
  ngOnInit() {
    this.api.getMyOffice().subscribe(
      (res)=>{
        this.items=res[0].items;
        this.api.getOfficeTransactions().subscribe(
          (res: Transaction[]) => {
            this.items.forEach(element => {
              element["transacciones"]=res.filter((tr)=>tr.item.id==element.id);
              let total=0;
              element["transacciones"].forEach((tr:Transaction)=>{
                total+=tr.getTotal();
              });
              element["totaltransacciones"]=total;
            });
          }
        );
      }
    );
  }

}
