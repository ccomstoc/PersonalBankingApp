import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { SortCardComponent } from "../sort-card/sort-card.component";

@Component({
  selector: 'app-catagorize',
  imports: [NavBarComponent, SortCardComponent],
  templateUrl: './catagorize.component.html',
  styleUrl: './catagorize.component.css'
})
export class CatagorizeComponent {

}
