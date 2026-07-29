import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainMenu } from './main-menu/main-menu';
import { SocialIcons } from './social-icons/social-icons';

@Component({
  selector: 'navbar',
  imports: [RouterLink, MainMenu, SocialIcons],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  logoSrc = 'images/logo_white_nav.png';
  mobileOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update(open => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
