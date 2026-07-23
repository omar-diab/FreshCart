import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = { token : localStorage.getItem('userToken')}

  checkOut(id:string|null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v1/orders/checkout-session/${id}/?url=${environments.URLServer}`, {
      'shippingDetails': shippingDetails,
    },
    {
      headers : this.myHeaders,
    }
  )}
}
