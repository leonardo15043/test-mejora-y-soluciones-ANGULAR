import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Invoice } from '../models/invoice.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.service.url;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getProducts(){
    return this.http.get<Product[]>(`${ this.url }product/all`, { headers: this.headers }).pipe( map( data => data ));
  }

}
