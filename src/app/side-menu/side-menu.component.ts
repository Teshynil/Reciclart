import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
declare var M:any;
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  public items:Array<any>;
  constructor(private authService:AuthService,private router:Router) {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
    this.items=[];
    var base=window.location.origin;
    switch (authService.getTipo()) {
      case "enterprise":
        this.items.push({ruta:base+"/main",icon:"home",elemento:"Inicio"});
        this.items.push({ruta:base+"/main",icon:"settings",elemento:"Configuracion"});
        this.items.push({ruta:base+"/main",icon:"people",elemento:"Usuarios"});
        this.items.push({ruta:base+"/main",icon:"",elemento:"Prueba"});
        break;
      case "office":
        
        break;
      case "center":
        
        break;
      default:
        break;
    }
  }

  ngOnInit() {
  }

}
