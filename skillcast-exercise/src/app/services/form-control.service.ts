import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomField } from '../components/user-form/models/form.model';
import { HttpClient } from '@angular/common/http';
import dataA from '../../data/CustomerA.json';
import dataB from '../../data/CustomerB.json';

@Injectable({
  providedIn: 'root'
})
export class FormControlService{

  constructor(private http: HttpClient) {}

  GetCustomFields(customerId: number) : Observable<CustomField[]> {
    //Replace with API call
    // const apiUrl = `https://${customerId}.example.com/api/user/attributes`;
    // return this.http.get(apiUrl);
    if (customerId === 1) {
      return of(dataA as CustomField[]);
    }
    else if (customerId === 2) {
      return of(dataB as CustomField[]);
    }
    else {
      throw new Error(`Customer with id: ${customerId} not found.`);
    }
    
  }

  SendFormData(formData: object, customerId: number): Observable<any> {
    const apiUrl = `https://${customerId}.example.com/api/user/register`;
    console.log(`Sending request to endpoint: ${apiUrl} with payload:`);
    console.log(formData);
    return this.http.post(apiUrl, formData);
  }
}