import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Measurement} from "../customer-profile/model/measurement";
import {ActivatedRoute, Router} from "@angular/router";
import {MeasurementService} from "./measurement-service/measurement.service";
import {CustomerService} from "../customer/customer-service/customer.service";
import {Customer} from "../customer/model/customer";
import {ObjectUtil} from "../../ObjectUtil";

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss']
})
export class AddMeasurementComponent implements OnInit {

  @Input() formValue: Measurement;
  addMeasurementForm : FormGroup;
  spinner = false;
  customerId: number;
  customer: Customer[];
  customerData: Customer= new Customer();
  measurement: Measurement = new Measurement();
  measurements: Measurement[];

  constructor(private route: Router,
              private formBuilder: FormBuilder,
              private measurementService: MeasurementService,
              private customerService: CustomerService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerId = this.router.snapshot.params.id;
    console.log(this.customerId, 'id')
    this.getCustomerDataByCustomerId();
    this.formMaker();
    if(!ObjectUtil.isEmpty(this.formValue)) {
      this.measurement= this.formValue;
      this.formMaker();
    }
    this.measurementService.getMeasurementList().subscribe((res=>{
      console.log(res, 'measurement')
    }))
  }

  formMaker() {
    this.addMeasurementForm = this.formBuilder.group({
      coatLength: [undefined,],
      coatChest: [undefined],
      coatWaist: [undefined],
      coatHip: [undefined],
      coatShoulder:[undefined],
      coatSleeveLength:[undefined],
      coatHalfBack:[undefined],
      coatNeck: [undefined],
      shirtLength: [undefined],
      shirtChest: [undefined],
      shirtWaist: [undefined],
      shirtHip: [undefined],
      shirtShoulder: [undefined],
      shirtSleeveLength: [undefined],
      shirtNeck: [undefined],
      pantLength: [undefined],
      pantWaist: [undefined],
      pantHip: [undefined],
      pantThigh: [undefined],
      pantKnee: [undefined],
      pantBottom: [undefined],
      pantCrouch:[undefined],
    })
  }
  onSubmit() {
    this.measurement.coatLength = this.addMeasurementForm.get('coatLength')?.value;
    this.measurement.coatChest = this.addMeasurementForm.get('coatChest')?.value;
    this.measurement.coatWaist = this.addMeasurementForm.get('coatWaist')?.value;
    this.measurement.coatHip = this.addMeasurementForm.get('coatHip')?.value;
    this.measurement.coatShoulder = this.addMeasurementForm.get('coatShoulder')?.value;
    this.measurement.coatSleeveLength = this.addMeasurementForm.get('coatSleeveLength')?.value;
    this.measurement.coatHalfBack = this.addMeasurementForm.get('coatHalfBack')?.value;
    this.measurement.coatNeck = this.addMeasurementForm.get('coatNeck')?.value;
    this.measurement.pantLength = this.addMeasurementForm.get('pantLength')?.value;
    this.measurement.pantWaist = this.addMeasurementForm.get('pantWaist')?.value;
    this.measurement.pantHip = this.addMeasurementForm.get('pantHip')?.value;
    this.measurement.pantThigh = this.addMeasurementForm.get('pantThigh')?.value;
    this.measurement.pantKnee = this.addMeasurementForm.get('pantKnee')?.value;
    this.measurement.pantBottom = this.addMeasurementForm.get('pantBottom')?.value;
    this.measurement.shirtLength = this.addMeasurementForm.get('shirtLength')?.value;
    this.measurement.shirtChest = this.addMeasurementForm.get('shirtChest')?.value;
    this.measurement.shirtWaist = this.addMeasurementForm.get('shirtWaist')?.value;
    this.measurement.shirtHip = this.addMeasurementForm.get('shirtHip')?.value;
    this.measurement.shirtSleeveLength = this.addMeasurementForm.get('shirtSleeveLength')?.value;
    this.measurement.shirtShoulder = this.addMeasurementForm.get('shirtShoulder')?.value;
    this.measurement.shirtNeck = this.addMeasurementForm.get('shirtNeck')?.value;
  }


  getCustomerDataByCustomerId() {
    this.spinner = true
    this.customerService.getCustomerData(this.customerId).subscribe((customerData => {
      console.log(customerData, 'customer data');
      this.spinner = false;
      this.customerData =  customerData;
    }))
  }
  saveMeasurement() {
    if(this.addMeasurementForm.invalid){
      alert('invalid');
    }else {
      this.measurementService.addMeasurementByCustomerId(this.customerId, this.addMeasurementForm.value).subscribe((response ) =>{
        console.log(response,'res')
        this.routeToProfile(this.customerId);

      })
    }
  }


  routeToProfile(id: number){
    this.route.navigate([`customer-profile/${id}`])
  }
}
