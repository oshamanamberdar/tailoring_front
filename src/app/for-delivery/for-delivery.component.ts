import { Component, OnInit } from '@angular/core';
import {OrderService} from "../customer-profile/order-service/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-for-delivery',
  templateUrl: './for-delivery.component.html',
  styleUrls: ['./for-delivery.component.scss']
})
export class ForDeliveryComponent implements OnInit {

  forDelivery: any
  constructor(private orderService: OrderService,
              private route: Router) { }

  ngOnInit(): void {
    this.getForDeliveryData();
  }
  getForDeliveryData() {
    this.orderService.getOrderList().subscribe((orderList) =>{
      this.forDelivery = orderList.filter((o)=> o.status === 'For Delivery')
      console.log(this.forDelivery, 'forDelivery')
    })
  }

  routeToOrderProfile(id: number){
    this.route.navigate([`customer-profile/${id}`])
  }

}
