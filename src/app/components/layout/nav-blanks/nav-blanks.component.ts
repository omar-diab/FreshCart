import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-blanks',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blanks.component.html',
  styles: ``,
})
export class NavBlanksComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _ElementRef = inject(ElementRef);
  private readonly _CartService = inject(CartService);  
  private readonly _ToastrService = inject(ToastrService);
  

  cartCount = this._CartService.cartCount;               

  ngOnInit(): void {                                      
    this._CartService.getProductsCart().subscribe({
      error: (err) => console.log(err)
    });
  }

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  /* close when clicking anywhere outside this component */
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (!this.isOpen()) return;

    const clickedInside = this._ElementRef.nativeElement.contains(
      target as Node
    );

    if (!clickedInside) {
      this.close();
    }
  }

  /* close on Escape */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  /* close if the window is resized up to desktop while the panel is open */
  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1024) {
      this.close();
    }
  }

  logedout(): void {
    this._AuthService.logOut();
    this._ToastrService.success('Logout Successfully!')
  }

  links = [
    { path: 'home', label: 'Home' },
    { path: 'products', label: 'Products' },
  ];
}