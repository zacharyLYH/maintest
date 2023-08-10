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
        })
      );
      this.addSubField(stepForms[stepForms.length - 1]);
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

  getSubFields(form: FormGroup): FormArray {
    return form.get('subFields') as FormArray;
  }

  getSubFieldControl(form: FormGroup, index: number): FormControl {
    return this.getSubFields(form).at(index) as FormControl;
  }

  addSubField(form: FormGroup): void {
    this.getSubFields(form).push(this._formBuilder.control(''));
  }

  removeSubField(form: FormGroup, index: number): void {
    this.getSubFields(form).removeAt(index);
  }

  submit(): void {
    console.log({
      step1: this.step1Forms.map((form) => form.value),
      step2: this.step2Forms.map((form) => form.value),
      step3: this.step3Forms.map((form) => form.value),
    });
  }
}
