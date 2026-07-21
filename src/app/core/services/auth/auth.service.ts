import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Http Client --> Import provideHttpClient(withFetch()) in appConfig

  private readonly _HttpClient = inject(HttpClient)

  postRegisterFrom(data:object)
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }
}
