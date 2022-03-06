import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "../customer/customer-service/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../customer/model/customer";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ObjectUtil} from "../../ObjectUtil";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  customers: Customer[];
  customerId: number
  customer= new Customer
  customerForm: FormGroup
  @Input() formValue: Customer;
  constructor(private customerService: CustomerService,
              private router: ActivatedRoute,
              private route: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.customerId = this.router.snapshot.params.id;
    this.formMaker();
    if(!ObjectUtil.isEmpty(this.formValue)){
      this.customer = this.formValue;
      this.formMaker();
    }
    this.customerService.getCustomerData(this.customerId).subscribe((response)=>{
      console.log(response, 'response from on init')
      this.customerForm = new FormGroup({
        name: new FormControl(response['name']),
        email: new FormControl(response['email']),
        phone: new FormControl(response['phone']),
        city: new FormControl(response['city']),
        state: new FormControl(response['state']),
        country: new FormControl(response['country'])
      })
    })
  }

  getCustomerData(){
    this.customerService.getCustomers().subscribe((customer) =>{
      console.log(customer, 'customer')
      this.customers = customer;
    })
  }

  updateCustomer(){
    this.customerService.updateCustomerByCustomerId(this.router.snapshot.params.id,this.customerForm.value ).subscribe((response)=>{
      console.log(response, 'response, from update')
      this.getCustomerData();
    })
  }


  onSubmit() {
    this.customer.name = this.customerForm.get('name')?.value;
    this.customer.phone = this.customerForm.get('phone')?.value;
    this.customer.email = this.customerForm.get('email')?.value;
    this.customer.city = this.customerForm.get('city')?.value;
    this.customer.state = this.customerForm.get('state')?.value;
    this.customer.country = this.customerForm.get('country')?.value;
  }

  formMaker() {
    this.customerForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      phone: [undefined, [Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
      email: [undefined, Validators.email],
      city: [undefined],
      state: [undefined],
      country: [undefined]
    })
  }

  get customerInfoControls() {
    return this.customerForm.controls;
  }


}
