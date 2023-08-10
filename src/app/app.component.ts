import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Step1Form {
  input1: string;
}

export interface Step2Form {
  input1: string;
  input2: string;
}

export interface Step3Form {
  textarea: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLinear = false;
  step1Forms: FormGroup[] = [];
  step2Forms: FormGroup[] = [];
  step3Forms: FormGroup[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.addForm(this.step1Forms);
    this.addForm(this.step2Forms);
    this.addForm(this.step3Forms);
  }

  addForm(stepForms: FormGroup[]): void {
    if (stepForms === this.step1Forms) {
      stepForms.push(
        this._formBuilder.group<Step1Form>({
          input1: '',
        })
      );
    } else if (stepForms === this.step2Forms) {
      stepForms.push(
        this._formBuilder.group<Step2Form>({
          input1: '',
          input2: '',
        })
      );
    } else if (stepForms === this.step3Forms) {
      stepForms.push(
        this._formBuilder.group<Step3Form>({
          textarea: '',
        })
      );
    }
  }

  removeForm(stepForms: FormGroup[], index: number): void {
    stepForms.splice(index, 1);
  }

  getFormControl(formGroup: FormGroup, controlName: string): FormControl {
    return formGroup.get(controlName) as FormControl;
  }

  submit(): void {
    // For demonstration purposes, printing the form data
    console.log(this.step1Forms.map((form) => form.value as Step1Form));
    console.log(this.step2Forms.map((form) => form.value as Step2Form));
    console.log(this.step3Forms.map((form) => form.value as Step3Form));
  }
}
