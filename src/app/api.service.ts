import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { plainToClass } from "class-transformer";
import { Observable } from 'rxjs';
import { Enterprise } from './models/enterprise';
import { Office } from "./models/office";
import { Transaction } from './models/transaction';
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
}
