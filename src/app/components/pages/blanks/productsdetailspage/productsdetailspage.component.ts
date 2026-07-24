import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { IProducts } from '../../../../core/interfaces/iproducts';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productsdetailspage',
  standalone: true,
  imports: [NgClass, CurrencyPipe],
  templateUrl: './productsdetailspage.component.html',
  styles: ``
})
export class ProductsdetailspageComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  

  productDetails: IProducts | null = null;
  galleryImages: string[] = [];
  selectedImage: string = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        const idProduct = param.get('id');
        if (!idProduct) return;

        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next: (res) => {
            this.productDetails = res.data;
            this.galleryImages = [res.data.imageCover, ...(res.data.images ?? [])];
            this.selectedImage = res.data.imageCover;
          },
          error: (err) => {
            console.log(err);
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}