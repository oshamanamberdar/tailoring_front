import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../customer-profile/order-service/order.service";
import {MeasurementService} from "../add-measurement/measurement-service/measurement.service";

@Component({
  selector: 'app-order-profile',
  templateUrl: './order-profile.component.html',
  styleUrls: ['./order-profile.component.scss']
})
export class OrderProfileComponent implements OnInit {

  orderId: any;
  orderData: any;
  customerId: any;
  measurementData: any;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private orderService: OrderService,
    private measurementService: MeasurementService
  ) { }

  ngOnInit(): void {
    this.orderId = this.router.snapshot.params.id;
    console.log(this.orderId, 'order id')
    this.getOrderAndCustomerData();
  }

  getOrderAndCustomerData() {
    this.orderService.getCustomerByOrderId(this.orderId).subscribe((order: any)=>{
      console.log(order, 'response')
      this.orderData = order;
      this.customerId = this.orderData.customer.id;
      console.log(this.customerId)
      this.getMeasurementData(this.customerId);
    })
  }
  getMeasurementData(id: any) {
    this.measurementService.getMeasurementByCustomerId(id).subscribe((response)=>{
      console.log(response, 'measurement');
      this.measurementData = response;
    })
  }
}
