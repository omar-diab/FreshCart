import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../core/services/products/products.service';
import { IProducts } from '../../../../../core/interfaces/iproducts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productsdetailspage',
  standalone: true,
  imports: [],
  templateUrl: './productsdetailspage.component.html',
  styles: ``
})
export class ProductsdetailspageComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  

  productDetails : IProducts | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param) => {
        let idProduct = param.get('id');

        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next:(res) => {
            this.productDetails = res.data
          },
          error:(err) => {
            console.log(err)
          }
        })
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
