import { Component, inject, OnInit } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { IProducts } from '../../../../core/interfaces/iproducts';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productsList: IProducts[] = [];
  isLoading: boolean = true;

  searchTerm: string = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  sortBy: string = '';
  isFilterOpen: boolean = false;

  currentPage: number = 1;
  numberOfPages: number = 1;
  totalResults: number = 0;

  ngOnInit(): void {
    this.getProducts(1);
  }

  getProducts(page: number): void {
    this.isLoading = true;

    this._ProductsService.getAllProducts(page).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.currentPage = res.metadata.currentPage;
        this.numberOfPages = res.metadata.numberOfPages;
        this.totalResults = res.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  get categories(): string[] {
    return [...new Set(this.productsList.map((p) => p.category.name))].sort();
  }

  get brands(): string[] {
    return [...new Set(this.productsList.map((p) => p.brand.name))].sort();
  }

  get activeFilterCount(): number {
    return this.selectedCategories.length + this.selectedBrands.length + (this.sortBy ? 1 : 0);
  }

  get filteredProducts(): IProducts[] {
    const term = this.searchTerm.trim().toLowerCase();

    let list = this.productsList.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.category.name.toLowerCase().includes(term) ||
        p.brand.name.toLowerCase().includes(term);

      const matchesCategory =
        this.selectedCategories.length === 0 || this.selectedCategories.includes(p.category.name);

      const matchesBrand =
        this.selectedBrands.length === 0 || this.selectedBrands.includes(p.brand.name);

      return matchesSearch && matchesCategory && matchesBrand;
    });

    switch (this.sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;
      case 'sold':
        list = [...list].sort((a, b) => b.sold - a.sold);
        break;
    }

    return list;
  }

  toggleCategory(name: string): void {
    const i = this.selectedCategories.indexOf(name);
    i === -1 ? this.selectedCategories.push(name) : this.selectedCategories.splice(i, 1);
  }

  toggleBrand(name: string): void {
    const i = this.selectedBrands.indexOf(name);
    i === -1 ? this.selectedBrands.push(name) : this.selectedBrands.splice(i, 1);
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.sortBy = '';
    this.searchTerm = '';
  }

  get pages(): number[] {
    return Array.from({ length: this.numberOfPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.numberOfPages || page === this.currentPage) return;
    this.getProducts(page);
    this.isFilterOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => this._ToastrService.success(res.message),
      error: (err) => console.log(err)
    });
  }
}