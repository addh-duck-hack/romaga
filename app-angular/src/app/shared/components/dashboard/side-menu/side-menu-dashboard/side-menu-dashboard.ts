import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardMenuItem } from 'src/app/shared/interfaces/dashboard-menu-item.interface';

@Component({
  selector: 'side-menu-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-dashboard.html',
  styleUrl: './side-menu-dashboard.css'
})
export class SideMenuDashboard {
  menuItems = signal<DashboardMenuItem[]>([
    {
      id: 1,
      icon: "fa-solid fa-chart-line",
      name: "Dashboard",
      description: "Dashboard para validar las estadisticas del sitio",
      route: "home",
      versionPro: false
    },
    {
      id: 2,
      icon: "fa-solid fa-satellite",
      name: "Cotizaciones",
      description: "Aqui se realizaran las cotizaciones de servicios",
      route: "price",
      versionPro: true
    },
    {
      id: 3,
      icon: "fa-solid fa-clock-rotate-left",
      name: "Historico",
      description: "Aqui se realizaran las cotizaciones de servicios",
      route: "history",
      versionPro: false
    }
  ]);
}
