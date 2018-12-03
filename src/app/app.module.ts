import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth-service.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { MainViewComponent } from './main-view/main-view.component';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { APIService } from "./api.service";
import { OfficesViewComponent } from './offices-view/offices-view.component';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';
import { TableRowComponent } from './table-row/table-row.component';
import { MainComponent } from './centers/main/main.component';
import { PurchaseComponent } from './centers/purchase/purchase.component';
import { MaterialsComponent } from './centers/materials/materials.component';
import { TransactionsComponent } from './centers/transactions/transactions.component';
import { MainOfficeComponent } from './office/main-office/main-office.component';
import { ItemsOfficeComponent } from './office/items-office/items-office.component';
import { TransactionsOfficeComponent } from './office/transactions-office/transactions-office.component';
import { SellOfficeComponent } from './office/sell-office/sell-office.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainViewComponent
  },
  {
    path: 'transactions',
    component: TransactionsViewComponent
  },
  {
    path: 'offices',
    component: OfficesViewComponent
  },
  {
    path: 'center/main',
    component: MainComponent
  },
  {
    path: 'center/purchase',
    component: PurchaseComponent
  },
  {
    path: 'center/materials',
    component: MaterialsComponent
  },
  {
    path: 'center/transactions',
    component: TransactionsComponent
  },
  {
    path: 'office/main',
    component: MainOfficeComponent
  },
  {
    path: 'office/sell',
    component: SellOfficeComponent
  },
  {
    path: 'office/items',
    component: ItemsOfficeComponent
  },
  {
    path: 'office/transactions',
    component: TransactionsOfficeComponent
  }
];
export const routing = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TopBarComponent,
    LoginComponent,
    MainViewComponent,
    SideMenuItemComponent,
    OfficesViewComponent,
    TransactionsViewComponent,
    TableRowComponent,
    MainComponent,
    PurchaseComponent,
    MaterialsComponent,
    TransactionsComponent,
    MainOfficeComponent,
    ItemsOfficeComponent,
    TransactionsOfficeComponent,
    SellOfficeComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4k1JwfAOl27-DgCiwPQLG7rlr3fGyM3'
    })
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true},
    APIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
