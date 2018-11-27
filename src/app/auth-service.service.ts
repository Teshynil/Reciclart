import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(email:string, password:string,tipo:string) {
        return this.http.post<any>("https://reciclarte-api.azurewebsites.net/api/account/"+tipo+"/login", {email, password},)
            .pipe(map(res => this.setSession(res,tipo)))
    }
          
    private setSession(authResult,tipo) {
        const expiresAt = moment(authResult.expiration).utcOffset(6);
        localStorage.setItem('id_token', authResult.token);
        localStorage.setItem('type', tipo);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    getTipo(){
        return localStorage.getItem("type");
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}