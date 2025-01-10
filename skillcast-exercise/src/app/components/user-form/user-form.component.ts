import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CustomField } from './models/form.model';
import { CommonModule } from '@angular/common';
import { FormControlService } from '../../services/form-control.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() customFields: CustomField[] | null = [];
  @Input() customerId!: number;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: FormControlService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.userForm = this.fb.group({});
    this.UpdateCustomFields();
  }

  UpdateCustomFields() {
    if (this.customFields === null) { return }

    this.customFields.forEach((field) => {
      var validators = this.GetValidators(field);                                                                                                                                                                                     
      var control = this.fb.control('', validators)
      this.userForm.addControl(field.attribute, control);
    });
  }

  GetValidators(field: CustomField){
    var validators = [];
    if (field.required) { 
      validators.push(Validators.required) 
    }
    if (field.type === 'text') {
      validators.push(this.textValidator)
    }
    if (field.type === 'date') {
      validators.push(this.dateValidator)
    }
    return validators;
  }

  dateValidator() {
    // Some validation
    return null;
  }

  textValidator() {
    // Some validation
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      var formDataJson = Object.entries(this.userForm.value).map(([key, value]) => ({
        attribute: key,
        value: value
      }));
      this.service.SendFormData(formDataJson, this.customerId).subscribe(
        (response) => {
          console.log(response.status);
          console.log(response.description)
        }
      );
    }
  }
}