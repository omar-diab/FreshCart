import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _HttpClient = inject(HttpClient);

  cartCount = signal<number>(0);

  get myHeader(): any {
    return { token: localStorage.getItem('userToken') };
  }

  private setCountFrom(res: any): void {
    const products = res?.data?.products ?? [];
    this.cartCount.set(
      products.reduce(
        (total: number, item: any) => total + (item.count ?? 0),
        0,
      ),
    );
  }

  addToCart(id: string): Observable<any> {
    return this._HttpClient
      .post(
        `${environments.baseURL}/api/v2/cart`,
        {
          productId: id,
        },
        {
          headers: this.myHeader,
        },
      )
      .pipe(tap((res: any) => this.setCountFrom(res)));
  }

  getProductsCart(): Observable<any> {
    return this._HttpClient
      .get(`${environments.baseURL}/api/v2/cart`, {
        headers: this.myHeader,
      })
      .pipe(tap((res: any) => this.setCountFrom(res)));
  }

  removeSpecificCartProduct(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${environments.baseURL}/api/v2/cart/${id}`, {
        headers: this.myHeader,
      })
      .pipe(tap((res: any) => this.setCountFrom(res)));
  }

  updateCartProductCount(id: string, newCount: number): Observable<any> {
    return this._HttpClient
      .put(
        `${environments.baseURL}/api/v2/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: this.myHeader,
        },
      )
      .pipe(tap((res: any) => this.setCountFrom(res)));
  }

  clearCartProducts(): Observable<any> {
    return this._HttpClient
      .delete(`${environments.baseURL}/api/v2/cart`, {
        headers: this.myHeader,
      })
      .pipe(tap(() => this.cartCount.set(0)));
  }

  resetCount(): void {
    this.cartCount.set(0);
  }
}
