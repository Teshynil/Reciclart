import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable()
export class EnterpriseService {
  constructor(private http: HttpClient) {
  }
  getMyEnterprise() {
    var enterprise;
    this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise").subscribe((res:Response)=>enterprise=res.json());
  }
  getOffices() {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise/offices");
  }
  getOfficesAndItems(id: number) {
    return this.http.get("https://reciclarte-api.azurewebsites.net/api/enterprises/myenterprise/offices/items");
  }
}