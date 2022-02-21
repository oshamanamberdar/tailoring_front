import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CustomerComponent} from "./customer/customer.component";
import {SupplierComponent} from "./supplier/supplier.component";
import {CustomerProfileComponent} from "./customer-profile/customer-profile.component";
import {OrderComponent} from "./order/order.component";

const routes: Routes = [
  {path:'', component:DashboardComponent, pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer-profile/:id', component: CustomerProfileComponent},
  {path: 'customer-profile/:id/order', component: OrderComponent},
  {path: 'supplier', component: SupplierComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
