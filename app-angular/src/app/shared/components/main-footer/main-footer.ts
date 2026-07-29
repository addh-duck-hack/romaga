import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'main-footer',
  imports: [RouterLink],
  templateUrl: './main-footer.html',
  styleUrl: './main-footer.css'
})
export class MainFooter {
  logo = 'images/logo_white_nav.png';
  year = new Date().getFullYear();
}
