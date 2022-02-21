import {Component, Input, OnInit} from '@angular/core';
import {CustomerService} from "./customer-service/customer.service";
import {Customer} from "./model/customer";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ObjectUtil} from "../../ObjectUtil";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  spinner = false;
  customers: Customer[] ;
  customerData:any
  customer: Customer = new Customer();
  customerForm: FormGroup
  submitted = false;
  @Input() formValue: Customer


  constructor(private customerService: CustomerService,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              public router: Router,) { }

  ngOnInit(): void {
    this.formMaker();
    if(!ObjectUtil.isEmpty(this.formValue)) {
      this.customer = this.formValue;
      this.formMaker();
    }
    this.getCustomers();
  }

  getCustomers() {
    this.spinner = true;
    this.customerService.getCustomers().subscribe((response) => {
      console.log(response, 'customers');
      this.customers = response;
      this.customerData = response;
      this.spinner= false;
      console.log(this.customerData, 'customer data')
    })
  }
  formMaker() {
    this.customerForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      phone: [undefined, Validators.required,  Validators.minLength(10), Validators.maxLength(10)],
      email: [undefined, Validators.email],
      city: [undefined],
      state: [undefined],
      country: [undefined, Validators.required]
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

  get customerFormControl() {
    return this.customerForm.controls;
  }
  deleteCustomer(id: number) {
    this.modalService.dismissAll()
    this.customerService.deleteCustomerById(id).subscribe((response)=>{
      this.getCustomers();

    })
  }
  saveCustomer() {
    if(this.customerForm.invalid){
      alert('invalid');
      this.submitted = false;
    } else {
      this.spinner= true;
      this.customerService.addCustomer(this.customerForm.value).subscribe((response) => {
        console.log('customes save', response);
        this.spinner= false;
       this.modalService.dismissAll();
        this.getCustomers();
      })
    }

  }

  open(content: any) {
    this.modalService.open(content);
  }
  openCustomerModal(content: any){
    this.modalService.open(content);
  }

  routeToProfile(id: number) {
    this.router.navigate([`customer-profile/${id}`]);
  }
}
