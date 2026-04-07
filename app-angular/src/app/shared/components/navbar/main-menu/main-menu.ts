import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarItem } from 'src/app/shared/interfaces/navbar-item.interface';



@Component({
  selector: 'main-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css'
})
export class MainMenu {
  menuItems: NavbarItem[] = [
    { id: 1, name: 'Home Principal', route: '/' },
    { id: 2, name: 'Acerca de nosotros', route: '/sobre-nosotros' },
    { id: 3, name: 'Servicios', route: '/servicios', subItems: [
      { id: 31, name: 'Suministro de agua', route: '/servicios' },
      { id: 32, name: 'Izajes con grúa articulada', route: '/servicios' },
      { id: 33, name: 'Materiales y residuos peligrosos', route: '/servicios' },
      { id: 34, name: 'Carga general', route: '/servicios' }
    ]},
    { id: 4, name: 'Contactanos', route: '/contacto' }
  ];
}
