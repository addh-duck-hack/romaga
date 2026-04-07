import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@tailwindplus/elements';
import { MainMenu } from '../main-menu/main-menu';

@Component({
  selector: 'navbar',
  imports: [MainMenu],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  imageSrc = 'images/logo.png';

}
