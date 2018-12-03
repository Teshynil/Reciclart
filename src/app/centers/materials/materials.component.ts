import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import { APIService } from 'src/app/api.service';
import { Material } from 'src/app/models/material';
import { Transaction } from 'src/app/models/transaction';
import { componentRefresh } from '@angular/core/src/render3/instructions';
declare var M: any;
@Component({
    selector: 'app-materials',
    templateUrl: './materials.component.html',
    styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit, AfterContentChecked {
    public materials: Material[] = new Array<Material>();
    public material:any;
    public availableMaterials: Material[]=new Array<Material>();
    constructor(private authService: AuthService, private router: Router, private api: APIService) {
        if (!this.authService.isLoggedIn() && authService.getTipo() == "center") {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        var modal = document.querySelector('#addMaterialModal');
        var instances = M.Modal.init(modal);
        this.api.getMyCenter().subscribe(
            (res) => {
                res[0].materials.forEach((e, i) => {
                    this.materials[i] = (e.material);
                });
                this.api.getMaterials().subscribe(
                    (res: Material[])=>{
                        res.forEach((e)=>{
                            let exclude:boolean=false;
                            this.materials.forEach((m)=>{
                                if(e.id==m.id){
                                    exclude=true;
                                    return;
                                }
                            });
                            if(!exclude){
                                this.availableMaterials.push(e);
                            }
                        });

                    }
                );
                this.api.getCenterTransactions().subscribe(
                    (res: Transaction[]) => {
                        this.materials.forEach(element => {
                            element["transacciones"] = [];
                            element["totaltransacciones"] = 0;
                            let transaciones = res.filter((tr) => tr.material.id == element.id);
                            element["transacciones"] = transaciones.length;
                            let total = 0;
                            transaciones.forEach((tr: Transaction) => {
                                total += tr.total;
                            });
                            element["totaltransacciones"] = total;
                            var elems = document.querySelectorAll('.tooltipped');
                            var instances = M.Tooltip.init(elems);
                        });
                    }
                );
            }
        );
    }
    ngAfterContentChecked() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems);
    }
    delete(id) {
        this.api.delCenterMaterial(id).subscribe(
            ()=>{
                M.toast({html:"El material fue eliminado"});
                this.materials.splice(this.materials.findIndex((e)=>e.id==id),1);
            },
            ()=>{
                M.toast({html:"Hubo un error"});
            }
        );
    }
    addMaterial(){
        this.api.addMaterial(this.material).subscribe(
            ()=>{
                M.toast({html:"El material fue añadido"});
                location.reload();
            },
            ()=>{
                M.toast({html:"Hubo un error"});
            }
        );
    }

    addMaterialModal(){
        var modal = document.querySelector('#addMaterialModal');
      //  modal.M_Modal.open();
    }
}
