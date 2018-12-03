import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Observable } from 'rxjs';
import { Enterprise } from './models/enterprise';
import { Office } from "./models/office";
import { Transaction } from './models/transaction';
import { Item } from './models/item';
@Injectable()
export class APIService {
  private result;
  constructor(private http: HttpClient) {
  }
  getMyEnterprise() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise")
    .pipe(
      map(res => plainToClass(Enterprise, res as Object[]))
    );
  }
  getOffices() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise/offices")
    .pipe(
      map(res => plainToClass(Office, res as Object[]))
    );
  }
  getOfficesAndItems() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise/offices/items")
    .pipe(
      map(res => plainToClass(Office, res as Object[]))
    );
  }
  getTransactions() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise/transactions")
    .pipe(
      map((res) => plainToClass(Transaction, res as Object[]))
    );
  }
  
  getMyOffice() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/offices/myoffice")
    .pipe(
      map(res => plainToClass(Office, res as Object[]))
    );
  }
  getOfficeTransactions() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/offices/myoffice/transactions")
    .pipe(
      map(res => plainToClass(Transaction, res as Object[]))
    );
  }
  
  postOfficeSale(accountId:string,itemsbuy:Item,quantity:number) {
    let itms={[itemsbuy.id]:quantity}
    let body={
      userid:accountId,
      items: itms
    };
    return this.http.post("https://reciclarte-api.azurewebsites.net/api/offices/myoffice/sale",body);
  }

  getAccountId(email:string){
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/account/getid/"+email,{ responseType: 'text' })
    .pipe(
      map(res=>res)
      );
  }
}
