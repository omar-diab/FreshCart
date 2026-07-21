import { Component } from '@angular/core';
import { NavBlanksComponent } from "../../components/layout/nav-blanks/nav-blanks.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/layout/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [NavBlanksComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

}
