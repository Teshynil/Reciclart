import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth-service.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { MainViewComponent } from './main-view/main-view.component';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { EnterpriseService } from "./enterprise.service";
import { OfficesViewComponent } from './offices-view/offices-view.component';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainViewComponent
  }
];
export const routing = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TopBarComponent,
    LoginComponent,
    DashboardComponent,
    MainViewComponent,
    SideMenuItemComponent,
    OfficesViewComponent,
    TransactionsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true},
    EnterpriseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
