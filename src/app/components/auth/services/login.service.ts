import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.service.url;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getLogin( user:any ) {
    return this.http.post<any>(`${ this.url }auth/login` , user).pipe( map( data => data ));
  }
  
}
