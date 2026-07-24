import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ICart } from '../../../../core/interface/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

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
        this._ToastrService.success(res.message)
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
          this._ToastrService.success(res.message)
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
