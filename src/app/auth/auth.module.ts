import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { AuthRoutingModule } from './auth-routeng.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth.service';
import { TokenService } from './service/token.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    LoginClientComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    TokenService,
    AuthGuard,
  ],
})
export class AuthModule {}
