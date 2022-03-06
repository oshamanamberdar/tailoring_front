import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CustomerComponent} from "./customer/customer.component";
import {SupplierComponent} from "./supplier/supplier.component";
import {CustomerProfileComponent} from "./customer-profile/customer-profile.component";
import {OrderComponent} from "./order/order.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AddMeasurementComponent} from "./add-measurement/add-measurement.component";
import {OnTrialComponent} from "./on-trial/on-trial.component";
import {ForDeliveryComponent} from "./for-delivery/for-delivery.component";
import {AlterationComponent} from "./alteration/alteration.component";
import {OrderProfileComponent} from "./order-profile/order-profile.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";


const routes: Routes = [
  {path:'', component:DashboardComponent, pathMatch:'full'},
  {path:'dashboard', component: DashboardComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'customer-profile/:id', component: CustomerProfileComponent},
  {path: 'customer-profile/:id/order', component: OrderComponent},
  {path: 'customer-profile/:id/measurement', component: AddMeasurementComponent},
  {path: 'customer-profile/:id/order-profile/:id', component:OrderProfileComponent},
  {path: 'customer-update/:id', component: UpdateCustomerComponent},
  {path: 'supplier', component: SupplierComponent},
  {path:'register', component: RegisterComponent},
  {path: 'trial', component:OnTrialComponent},
  {path: 'forDelivery', component: ForDeliveryComponent},
  {path: 'alteration', component: AlterationComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
