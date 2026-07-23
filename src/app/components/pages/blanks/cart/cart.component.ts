import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ICart } from '../../../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.removeSpecificCartProduct(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  updateCount(id: string, newCount: number): void {
    this._CartService.updateCartProductCount(id, newCount).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  clearCartItems(): void {
    this._CartService.clearCartProducts().subscribe({
      next: (res) => {
        console.log(res)
        if(res.status == 'success') {
          this.cartDetails = {} as ICart;
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
