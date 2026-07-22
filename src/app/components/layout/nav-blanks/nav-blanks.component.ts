import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-nav-blanks',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blanks.component.html',
  styles: ``
})
export class NavBlanksComponent {
  private readonly _AuthService = inject(AuthService);

  logedout():void {
    this._AuthService.logOut();
  }
}
