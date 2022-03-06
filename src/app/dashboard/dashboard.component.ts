import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from "@nebular/theme";
import {UserService} from "../auth-services/user.service";
import {OrderService} from "../customer-profile/order-service/order.service";
import {Order} from "../customer-profile/model/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders: any;
  newOrder: any;
  newOrderNumber =0;
  onTrial: any;
  trialNumber=0;
  deliveryNumber =0
  alterationNumber =0
  forDelivery: any
  alteration: any;
  constructor(private sidebarService: NbSidebarService,
              private userService : UserService,
              private orderService: OrderService,
              private route: Router) { }

  ngOnInit(): void {
    this.getAllOrder();
    this.userService.getPublicContent().subscribe(data => {
      console.log(data, 'data')
    },
      err=>{
        console.log(JSON.parse(err.error).message());
      })
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  getAllOrder(){
    this.orderService.getOrderList().subscribe((orders)=>{
      console.log(orders, 'orders')
      this.orders = orders;
      this.onTrial = this.orders.filter((o: any)=> o.status === 'On Trial');
      this.forDelivery = this.orders.filter((o: any) => o.status === 'For Delivery')
      this.alteration = this.orders.filter((o: any) => o.status === 'Alteration')
      this.trialNumber = this.onTrial.length;
      this.deliveryNumber = this.forDelivery.length;
      this.alterationNumber = this.alteration.length;
      this.newOrderNumber = this.newOrder.length;
    })
  }
  routeToTrial() {
    this.route.navigate(['trial'])
  }
  routeToDelivery() {
    this.route.navigate(['forDelivery'])
  }
  routeToAlteration() {
    this.route.navigate(['alteration'])
  }
}
