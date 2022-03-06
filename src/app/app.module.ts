import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    NbSidebarService,
    NbButtonModule,
    NbListModule, NbIconModule, NbCardModule, NbAlertModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import {MatCardModule} from "@angular/material/card";
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { OrderComponent } from './order/order.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import {NotifierModule, NotifierService} from "angular-notifier";
import {SimpleNotificationsModule} from "angular2-notifications";
import { OnTrialComponent } from './on-trial/on-trial.component';
import { ForDeliveryComponent } from './for-delivery/for-delivery.component';
import { DeliveredComponent } from './delivered/delivered.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { AlterationComponent } from './alteration/alteration.component';
import { OrderProfileComponent } from './order-profile/order-profile.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { UpdateMeasurementComponent } from './update-measurement/update-measurement.component';
import { ViewMeasurementComponent } from './view-measurement/view-measurement.component';
import {NgxPrintModule} from "ngx-print";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerComponent,
    SupplierComponent,
    CustomerProfileComponent,
    OrderComponent,
    SpinnerComponent,
    RegisterComponent,
    AddMeasurementComponent,
    OnTrialComponent,
    ForDeliveryComponent,
    DeliveredComponent,
    CancelledComponent,
    AlterationComponent,
    OrderProfileComponent,
    UpdateCustomerComponent,
    UpdateOrderComponent,
    UpdateMeasurementComponent,
    ViewMeasurementComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'cosmic'}),
        NbLayoutModule,
        NbEvaIconsModule,
        NbSidebarModule,
        NbButtonModule,
        NbListModule,
        NbIconModule,
        NbCardModule,
        MatCardModule,
        NgbModule,
        HttpClientModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        NbAlertModule,
        NotifierModule,
        SimpleNotificationsModule.forRoot(),
        NgxPrintModule,


    ],
  providers: [NbSidebarService,NgbActiveModal,ReactiveFormsModule,
  NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
