import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router  } from '@angular/router';  
import { MatSnackBar } from '@angular/material/snack-bar';
import { statusHttp } from 'src/app/core/helpers/utilities';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _loginService:LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm(){

    this.loginForm = this.formBuilder.group({
      'email':[],
      'password':[]
    });

  }

  public login(){
    this._loginService.getLogin(this.loginForm.value).subscribe( auth =>{
      localStorage.setItem('token', auth.access_token );
      this.router.navigate(['/invoice/list']);
    },error => {
      this._snackBar.open(statusHttp(error.status),'',
        {
          panelClass: 'alert-error',
          duration: 4000,
        }
      );
    })
  }

}
