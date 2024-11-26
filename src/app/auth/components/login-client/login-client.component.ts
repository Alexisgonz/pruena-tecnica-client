import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RuleCssBySelector } from '../../../shared/directives/add-rules-css.directive';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
})
export class LoginClientComponent implements OnInit {
  loginForm!: FormGroup;
  rule!: RuleCssBySelector;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.formInit();
  }

  formInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogin(): void {
    const rawValue = this.loginForm.getRawValue();
    this.authService.login(rawValue).subscribe({
      next: () => {
        this.redirectToRoot();
        console.log('Login success');
      },
    }
    );
  }

  redirectToRoot(): void {
    this.router.navigateByUrl('/tareas');
  }
}
