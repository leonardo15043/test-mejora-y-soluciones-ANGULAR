import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: [],
    declarations: [ AuthLoginComponent ]
})
export class AuthModule {}