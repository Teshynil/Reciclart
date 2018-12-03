import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { Item } from 'src/app/models/item';
import { Transaction } from 'src/app/models/transaction';
import { Material } from 'src/app/models/material';
declare var M: any;
@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterContentChecked {
    public materials: Material[]=[];
    constructor(private authService: AuthService, private router: Router, private api: APIService) {
        if (!this.authService.isLoggedIn() && authService.getTipo() == "center") {
            this.router.navigate(['/login']);
        }
    }
    ngAfterContentChecked() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, { accordion: true });
    }
    ngOnInit() {
        this.api.getMyCenter().subscribe(
            (res) => {
                res[0].materials.forEach((e,i) => { 
                    this.materials[i]=(e.material);
                });
                this.api.getCenterTransactions().subscribe(
                    (res: Transaction[]) => {
                        this.materials.forEach(element => {
                            element["transacciones"] = res.filter((tr) => tr.material.id == element.id);
                            let total = 0;
                            element["transacciones"].forEach((tr: Transaction) => {
                                total += tr.total;
                            });
                            element["totaltransacciones"] = total;
                        });
                    }
                );
            }
        );
    }

}
