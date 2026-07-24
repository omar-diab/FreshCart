import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  // Services
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    },
    {},
  );

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService.postloginFrom(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.msgSuccess = true;
            this._ToastrService.success('Loged Successfully!')
            setTimeout(() => {
              localStorage.setItem('userToken', res.token)

              this._AuthService.saveUserData()

              this._Router.navigate(['/home']);
            });
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          this.isLoading = false;
          this._ToastrService.error(this.msgError)
        },
      });
    } else {
      this.loginForm.setErrors({ mismatch: true });
      this.loginForm.markAllAsTouched();
    }
  }
}
