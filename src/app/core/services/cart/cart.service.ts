import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient)

  myHeader:any = { token : localStorage.getItem('userToken') }

  addToCart(id:string): Observable<any> {
    return this._HttpClient.post(`${environments.baseURL}/api/v2/cart`, {
      'productId': id
    }, {
      headers: this.myHeader
    })
  }

  getProductsCart(): Observable<any> {
    return this._HttpClient.get(`${environments.baseURL}/api/v2/cart`, {
      headers : this.myHeader
    })
  }

  removeSpecificCartProduct(id: string): Observable<any> {
    return this._HttpClient.delete(`${environments.baseURL}/api/v2/cart/${id}`, {
      headers : this.myHeader
    })
  }

  updateCartProductCount(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environments.baseURL}/api/v2/cart/${id}`, {
      'count' : newCount,
    },
    {
      headers : this.myHeader
    }
  )}

  clearCartProducts(): Observable<any> {
    return this._HttpClient.delete(`${environments.baseURL}/api/v2/cart`, {
      headers : this.myHeader
    }
  )}

}
