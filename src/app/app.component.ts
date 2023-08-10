import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  initialStep1Data = [
    {
      input1: 'Example 1',
      subFields: ['SubField 1A', 'SubField 1B'],
      links: ['Link 1A'],
    },
    { input1: 'Example 2', subFields: [], links: [] },
  ];
  initialStep2Data = [
    { input1: 'Step 2 Example 1', input2: 'Value 2A', isMember: true },
  ];

  initialStep3Data = [{ textarea: 'Step 3 example content.' }];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormsFromData(this.initialStep1Data, this.step1Forms, 'step1');
    this.initFormsFromData(this.initialStep2Data, this.step2Forms, 'step2');
    this.initFormsFromData(this.initialStep3Data, this.step3Forms, 'step3');
  }

  initFormsFromData(
    initialData: any[],
    stepForms: FormGroup[],
    stepType: string
  ) {
    for (let data of initialData) {
      let formGroup: FormGroup = this._formBuilder.group({});

      switch (stepType) {
        case 'step1':
          formGroup = this._formBuilder.group({
            input1: [data.input1, Validators.required],
            subFields: this._formBuilder.array(
              (data.subFields || []).map((subField: string) =>
                this._formBuilder.control(subField, Validators.required)
              )
            ),
            links: this._formBuilder.array(
              (data.links || []).map((link: string) =>
                this._formBuilder.control(link, [
                  Validators.required,
                  Validators.pattern(this.urlPattern),
                ])
              )
            ),
          });
          break;
        case 'step2':
          formGroup = this._formBuilder.group({
            input1: [data.input1, Validators.required],
            input2: [data.input2, Validators.required],
            isMember: [data.isMember],
          });
          break;
        case 'step3':
          formGroup = this._formBuilder.group({
            textarea: [data.textarea, Validators.required],
          });
          break;
        default:
          throw new Error(`Unknown stepType: ${stepType}`);
      }
      stepForms.push(formGroup);
    }
  }
  urlPattern = 'https?://.+';
  addForm(stepForms: FormGroup[]): void {
    const urlPattern = 'https?://.+';

    if (stepForms === this.step1Forms) {
      stepForms.push(
        this._formBuilder.group({
          input1: ['', Validators.required],
          subFields: this._formBuilder.array([], Validators.required),
          links: this._formBuilder.array([], Validators.pattern(urlPattern)),
        })
      );
    } else if (stepForms === this.step2Forms) {
      stepForms.push(
        this._formBuilder.group({
          input1: ['', Validators.required],
          input2: ['', Validators.required],
          isMember: [false],
        })
      );
    } else {
      stepForms.push(
        this._formBuilder.group({
          textarea: ['', Validators.required],
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
    if (arrayName === 'links') {
      this.getFormArray(form, arrayName).push(
        this._formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.urlPattern),
        ])
      );
    } else {
      this.getFormArray(form, arrayName).push(
        this._formBuilder.control('', Validators.required)
      );
    }
  }

  removeSubField(form: FormGroup, arrayName: string, index: number): void {
    this.getFormArray(form, arrayName).removeAt(index);
  }

  allFormsAreValid(): boolean {
    return [...this.step1Forms, ...this.step2Forms, ...this.step3Forms].every(
      (form) => form.valid
    );
  }

  submit(): void {
    console.log({
      step1: this.step1Forms.map((form) => form.value),
      step2: this.step2Forms.map((form) => form.value),
      step3: this.step3Forms.map((form) => form.value),
    });
  }
}
