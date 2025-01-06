import { Component } from '@angular/core';
import { async, Observable } from 'rxjs';
import { CustomField } from './components/user-form/models/form.model';
import { FormControlService } from './services/form-control.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  providers: [FormControlService],
  imports: [UserFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  customerId: number = 1;
  customFields$: Observable<CustomField[]>;

  constructor(private service: FormControlService) {
    this.customFields$ = service.GetCustomFields(this.customerId);
   }

   buttonClicked() {
    this.customerId = 3 - this.customerId;
    this.customFields$ = this.service.GetCustomFields(this.customerId);
   }
}
