import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "../customer/customer-service/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../customer/model/customer";
import {Order} from "./model/order";
import {OrderService} from "./order-service/order.service";
import {ObjectUtil} from "../../ObjectUtil";

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  spinner= false;
  customerId: number;
  customer: Customer[];
  customerData = new Customer();
  @Input() orderFormValue: Order;
  orderData: Order = new Order();
  customerOrder:Order;
  orders: any;

  constructor(private customerService: CustomerService,
              private router: ActivatedRoute,
              private route: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderByCustomerId();
    this.customerId = this.router.snapshot.params.id;
    console.log(this.customerId, 'id')
    this.getCustomerDataByCustomerId();
  }


  getCustomerDataByCustomerId() {
    this.spinner = true;
    this.customerService.getCustomerData(this.customerId).subscribe((customerData=> {
      console.log(customerData, 'customer data');
      this.spinner= false;
      this.customerData = customerData;
    }))

  }


  getOrderByCustomerId() {
    this.spinner= true;
    this.orderService.getOrderByCustomerId(this.customerId).subscribe((response)=>{
      console.log(response, 'response');
      this.spinner= false;
      this.customerOrder = response;
      this.orders = this.customerOrder;
    })
  }

  // saveOrder(){
  //   if(this.orderForm.invalid){
  //     alert('invalid');
  //   } else {
  //     this.spinner= true;
  //     this.orderService.addOrderByCustomerId(this.customerId, this.orderForm.value).subscribe((response) => {
  //       this.spinner = false;
  //       console.log('order Data', response);
  //       this.modalService.dismissAll();
  //       this.getOrderByCustomerId();
  //     })
  //   }
  // }

  routeToAddOrder(id: number){
    this.route.navigate([`customer-profile/${id}/order`])
  }

  }
