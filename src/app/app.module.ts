import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IndexComponent } from '../app/home/index/index.component';
import { LoginComponent } from './home/login/login.component';
import { TestComponent } from './home/test/test.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './home/header/header.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './home/detail/detail.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [
  {path: 'test', component: TestComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: IndexComponent},
  {path: 'admin/dashboard', component: DashboardComponent},
  {path:'detail',component:DetailComponent},
  {path:'header',component:HeaderComponent},
  {path:'dashboard',component:DashboardComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    TestComponent,
    HeaderComponent,
    DashboardComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000,enableHtml: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
