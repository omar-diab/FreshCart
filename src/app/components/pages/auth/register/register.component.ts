import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnDestroy {
  // Services
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
    private readonly _ToastrService = inject(ToastrService);
  

  msgError: string = '';
  msgSuccess: boolean = false;

  isLoading: boolean = false;

  registerSub! : Subscription;

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: [this.confirmPassword] },
  );

  // Custom Validation function --- g = Registered Form
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSub = this._AuthService.postRegisterFrom(this.registerForm.value).subscribe({
        next: (res) => {
        this._ToastrService.success(res.message)
        if(res.message == 'success') {
          this.msgSuccess = true
          setTimeout(() => {
            this._Router.navigate(['/login'])
          }, 2000)
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
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }

}
