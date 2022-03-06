import { Component, OnInit } from '@angular/core';
import {OrderService} from "../customer-profile/order-service/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-on-trial',
  templateUrl: './on-trial.component.html',
  styleUrls: ['./on-trial.component.scss']
})
export class OnTrialComponent implements OnInit {

  constructor(private orderService: OrderService,
              private route: Router) { }

  onTrial: any
  ngOnInit(): void {
    this.getTrialData();
  }

  getTrialData() {
    this.orderService.getOrderList().subscribe((orderList) =>{
      this.onTrial = orderList.filter((o)=> o.status === 'On Trial')
      console.log(this.onTrial, 'ontrial')
    })
  }

  routeToOrderProfile(id: number){
    this.route.navigate([`customer-profile/${id}`])
  }

}
