import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
declare var M:any;
declare var mzbox:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email;
  public password;
  public tipo;
  constructor(private authService:AuthService, private router:Router) {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/main']);
    }
    document.getElementsByTagName("body")[0].setAttribute("class","teal");
    this.email="";
    this.password="";
    this.tipo="";
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });
  }
  ngOnInit() {
  }

  forgotPass(){
    mzbox.alert("Si olvidaste tu contraseña, es necesario comunicarse con el C.A.C. de Reciclart");
  }

  submit(){
    this.authService.login(this.email, this.password,this.tipo)
                .subscribe(
                    () => {
                        console.log("User is logged in");
                        window.location.href="/main";
                    }
                );
    M.toast({html: 'Usuario o contraseña invalida'});
    return false;
  }
}
