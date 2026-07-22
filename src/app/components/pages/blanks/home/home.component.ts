import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { IProducts } from '../../../../core/interfaces/iproducts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);

  productsList:IProducts[] = [];

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next:(res) => {
        this.productsList = res.data
        console.log(res.data)
      },
      error:(err) => {
        console.log(err)
      }
    })
  }



}
