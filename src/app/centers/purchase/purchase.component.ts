import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Material } from 'src/app/models/material';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { Office } from 'src/app/models/office';
import { Center } from 'src/app/models/center';
declare var M: any;
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
    public materials:any;
    constructor(private authService: AuthService, private router: Router, private api: APIService) {
        if (!this.authService.isLoggedIn() && authService.getTipo() == "center") {
            this.router.navigate(['/login']);
        }
        this.material = this.client = '';
        this.quantity = this.total = 0;
        this.materials=[];
    }

    ngOnInit() {
        this.api.getMyCenter().subscribe(
            (res: Center[]) => {
                res[0].materials.forEach((e,i) => { 
                    this.materials[i]=(e.material);
                });
            }
        );
    }

    submit(){
        this.api.getAccountId(this.client).subscribe(
          (userId:string)=>this.api.postCenterSale(userId,this.materials[this.material],this.quantity).subscribe(
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
        if(this.material!=='')
          this.total=this.quantity*this.materials[this.material].price;
      }


}


