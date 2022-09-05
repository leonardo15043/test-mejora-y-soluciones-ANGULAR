import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Invoice, InvoiceProduct } from '../models/invoice.interface';

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

  getInvoice(id:number){
    return this.http.get<Invoice>(`${ this.url }invoice/view/${id}`, { headers: this.headers });
  }

  getInvoices(){
    return this.http.get<Invoice[]>(`${ this.url }invoice/all`, { headers: this.headers }).pipe( map( data => data ));
  }

  saveInvoice( invoice:Invoice ){
      return this.http.post<Invoice>(`${ this.url }invoice/add`,invoice, { headers: this.headers });
  }

  updateInvoice( invoice:Invoice ){
    return this.http.put<Invoice>(`${ this.url }invoice/edit/${invoice.id}`,invoice, { headers: this.headers });
  }

  assignProduct( invoiceProduct:InvoiceProduct ){
    return this.http.post<InvoiceProduct>(`${ this.url }invoice/product/assign`,invoiceProduct, { headers: this.headers });
  }

  getProducts( idInvoice:number ){
    return this.http.get<[]>(`${ this.url }invoice/product/view/${idInvoice}`, { headers: this.headers }).pipe( map( data => data ));
  }

}
