import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@tailwindplus/elements';
import { MainMenu } from './main-menu/main-menu';
import { SocialIcons } from './social-icons/social-icons';

@Component({
  selector: 'navbar',
  imports: [MainMenu, SocialIcons],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  imageSrc = 'images/logo_opcaity.png';
}
