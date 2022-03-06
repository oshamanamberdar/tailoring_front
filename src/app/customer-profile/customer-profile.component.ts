import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "../customer/customer-service/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../customer/model/customer";
import {Order} from "./model/order";
import {OrderService} from "./order-service/order.service";
import {ObjectUtil} from "../../ObjectUtil";
import {MeasurementService} from "../add-measurement/measurement-service/measurement.service";
import {HttpClient} from "@angular/common/http";

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
  measurementNumber = 0;
  selectedFile: File;
  imgURL: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;
  imageName: any;
  measurementData: any

  constructor(private customerService: CustomerService,
              private router: ActivatedRoute,
              private route: Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private measurementService: MeasurementService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getMeasurementData();
    this.getOrderByCustomerId();
    this.customerId = this.router.snapshot.params.id;
    console.log(this.customerId, 'id')
    this.getCustomerDataByCustomerId();
    this.getOrderData();
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
  getOrderData() {
    this.orderService.getOrderByCustomerId(this.customerId).subscribe((response)=>{
      console.log(response, 'orders')
      this.orders = response;
    })
  }

  routeToAddOrder(id: number){
    this.route.navigate([`customer-profile/${id}/order`])
  }
  routeToAddMeasurement(id: number) {
    this.route.navigate([`customer-profile/${id}/measurement`])
}

routeToOrderProfile(id: number) {
    this.route.navigate([`order-profile/${id}`])
}

  getMeasurementData() {
    this.measurementService.getMeasurementByCustomerId(this.router.snapshot.params.id).subscribe((response)=>{
      console.log(response, 'measurement');
      this.measurementData = response;
      this.measurementNumber = this.measurementData.length;

    })
  }



}
