import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RuleCssBySelector } from '../../../shared/directives/add-rules-css.directive';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
  ],
})
export class LoginClientComponent implements OnInit {
  loginForm!: FormGroup;
  rule!: RuleCssBySelector;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin(): void {}
}
