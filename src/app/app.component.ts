import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  insuranceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dateFormatter: NgbDateParserFormatter
  ) { }

  ngOnInit(): void {
    this.setFormControls();
  }

  setFormControls() {
    this.insuranceForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      insurance_period: [null, Validators.required],
      terms_and_condition: [false],
      purpose_of_use: [],
      business_use_category: ['1'],
      discount: [],
      licence_number: [],
      payment_method: [],
      payment_type: [],
    })
  }

  onSubmit() {
    this.insuranceForm.value.dob = typeof this.insuranceForm.value.dob === 'object' ?
      this.dateFormatter.format(this.insuranceForm.value.dob)
      : this.insuranceForm.value.dob;

    this.insuranceForm.value.insurance_period = typeof this.insuranceForm.value.insurance_period === 'object' ?
      this.dateFormatter.format(this.insuranceForm.value.insurance_period)
      : this.insuranceForm.value.insurance_period;

    console.log(this.insuranceForm.value);
  }

  get f() {
    return this.insuranceForm.controls;
  }

  Reset() {
    this.insuranceForm.reset();
    this.insuranceForm.patchValue({ terms_and_condition: false, business_use_category: '1' })
  }
}
