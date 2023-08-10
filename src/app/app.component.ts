import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
        this._formBuilder.group({
          input1: '',
          subFields: this._formBuilder.array([]),
          links: this._formBuilder.array([]),
        })
      );
    } else if (stepForms === this.step2Forms) {
      stepForms.push(
        this._formBuilder.group({
          input1: '',
          input2: '',
        })
      );
    } else {
      stepForms.push(
        this._formBuilder.group({
          textarea: '',
        })
      );
    }
  }

  deleteForm(stepForms: FormGroup[], index: number): void {
    stepForms.splice(index, 1);
  }

  getFormArray(form: FormGroup, arrayName: string): FormArray {
    return form.get(arrayName) as FormArray;
  }

  getFormControl(
    form: FormGroup,
    arrayName: string,
    index: number
  ): FormControl {
    return this.getFormArray(form, arrayName).at(index) as FormControl;
  }

  addSubField(form: FormGroup, arrayName: string): void {
    this.getFormArray(form, arrayName).push(this._formBuilder.control(''));
  }

  removeSubField(form: FormGroup, arrayName: string, index: number): void {
    this.getFormArray(form, arrayName).removeAt(index);
  }

  submit(): void {
    console.log({
      step1: this.step1Forms.map((form) => form.value),
      step2: this.step2Forms.map((form) => form.value),
      step3: this.step3Forms.map((form) => form.value),
    });
  }
}
