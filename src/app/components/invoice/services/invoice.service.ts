import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Invoice } from '../models/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private url = environment.service.url;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getInvoices(){
    return this.http.get<Invoice[]>(`${ this.url }invoice/all`, { headers: this.headers }).pipe( map( data => data ));
  }

  saveInvoice( invoice:Invoice ){
      return this.http.post<Invoice>(`${ this.url }invoice/add`,invoice, { headers: this.headers });
  }


}
