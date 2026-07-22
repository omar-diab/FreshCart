import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Http Client --> Import provideHttpClient(withFetch()) in appConfig

  private readonly _HttpClient = inject(HttpClient)

  postRegisterFrom(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/signup`, data)
  }
  postloginFrom(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/auth/signin`, data)
  }

}
