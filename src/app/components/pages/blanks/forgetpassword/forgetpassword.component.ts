import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styles: ``,
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)


  step:number = 1;


  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyEmailSubmit():void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);

    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next:(res) => {
        if(res.statusMsg == 'success') {
          this.step = 2;
        }
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  verifyCodeSubmit():void {
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next:(res) => {
        if(res.status == 'Success') {
          this.step = 3;
        }
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  });

  resetPasswordSubmit():void {
    this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
      next:(res) => {
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData()
        this._Router.navigate(['/home'])
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

}


