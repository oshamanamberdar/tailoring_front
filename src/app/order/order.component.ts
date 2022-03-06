import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../customer-profile/order-service/order.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../customer/customer-service/customer.service";
import {Customer} from "../customer/model/customer";
import {Order} from "../customer-profile/model/order";
import {ObjectUtil} from "../../ObjectUtil";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  spinner = false;
  customerId: number;
  customer: Customer[];
  customerData: Customer= new Customer();
  orderForm: FormGroup;
  @Input() orderFormValue: Order;
  orderData: Order = new Order();
  customerOrder:Order;
  orders: any;
  balanceAmount = 0;
  advanceAmount = 0;
  totalAmount =0;


  constructor( private orderService: OrderService,
               private formBuilder: FormBuilder,
               private customerService: CustomerService,
               private router: ActivatedRoute,
               private route: Router) { }

  ngOnInit(): void {
    this.customerId = this.router.snapshot.params.id;
    this.getCustomerDataByCustomerId();
    this.formMaker();
    if(!ObjectUtil.isEmpty(this.orderFormValue)){
      this.orderData = this.orderFormValue;
      this.formMaker();
    }
    this.calculateTotalBalance();
  }


  addItem() {
    const control = this.orderForm.controls.items as FormArray;
    control.push(
      this.formBuilder.group({
        item: [undefined, Validators.required],
        quantity: [undefined, Validators.required]
      })
    )
  }


  removeItem(index: number) {
    const items = this.orderForm.get('items') as FormArray;
    items.removeAt(index)
  }


  get orderItems () {
    return this.orderForm.get('items') as FormArray
  }

  onSubmit(){
    this.orderData.orderDate = this.orderForm.get('orderDate')?.value;
    this.orderData.trialDate = this.orderForm.get('trialDate')?.value;
    this.orderData.deliveryDate = this.orderForm.get('deliveryDate')?.value;
    this.orderData.totalAmount = this.orderForm.get('totalAmount')?.value;
    this.orderData.advanceAmount = this.orderForm.get('advanceAmount')?.value;
    this.orderData.balanceAmount = this.orderForm.get('balanceAmount')?.value;
    this.orderData.item =JSON.stringify(this.orderForm.get('item')?.value);
    this.orderData.quantity = JSON.stringify(this.orderForm.get('quantity')?.value);
    this.orderData.status = this.orderForm.get('status')?.value;
  }


  formMaker(){
    this.orderForm = this.formBuilder.group({
      orderDate: [undefined, Validators.required],
      trialDate: [undefined, Validators.required],
      deliveryDate: [undefined, Validators.required],
      totalAmount: [undefined, Validators.required],
      advanceAmount: [undefined, Validators.required],
      balanceAmount: [undefined, Validators.required],
      status: [undefined, Validators.required],
      items: this.formBuilder.array([]),
    });

  }

  getCustomerDataByCustomerId() {
    this.spinner = true
    this.customerService.getCustomerData(this.customerId).subscribe((customerData => {
      console.log(customerData);
      this.spinner = false;
      this.customerData =  customerData;
    }))
  }

  saveOrder() {
    if(this.orderForm.invalid){
      alert('invalid');
    } else {
      this.spinner= true;
      this.orderService.addOrderByCustomerId(this.customerId, this.orderData).subscribe((response) => {
        this.spinner = false;
        console.log('order Data', response);
        this.routeToProfile(this.customerId);
      })
    }
  }
  routeToProfile(id: number) {
    this.route.navigate([`customer-profile/${id}`]);
  }

  calculateTotalBalance(){
    this.orderForm.get('advanceAmount')?.valueChanges.subscribe(advanceAmount=>{
      console.log(advanceAmount, 'val');
      this.advanceAmount = advanceAmount;

    this.orderForm.get('totalAmount')?.valueChanges.subscribe(totalAmount=>{
      console.log(totalAmount, 'total amount')
      this.totalAmount = totalAmount;
      this.balanceAmount = this.totalAmount - this.advanceAmount;
      console.log(this.balanceAmount, 'balance amoutn')
    })
    })
  }

  get orderFormControl() {
    return this.orderForm.controls;
  }
}
