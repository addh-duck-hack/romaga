import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarItem } from 'src/app/shared/interfaces/navbar-item.interface';

@Component({
  selector: 'main-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css'
})
export class MainMenu {
  @Input() vertical = false;
  @Output() linkClicked = new EventEmitter<void>();

  menuItems: NavbarItem[] = [
    { id: 1, name: 'Inicio', route: '/' },
    { id: 2, name: 'Servicios', route: '/servicios' },
    { id: 3, name: 'Nosotros', route: '/sobre-nosotros' },
    { id: 4, name: 'Contacto', route: '/contacto' }
  ];
}
