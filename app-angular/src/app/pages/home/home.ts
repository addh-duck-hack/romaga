import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MainFooter } from '../../shared/components/main-footer/main-footer';
import { StatsStrip } from '../../shared/components/stats-strip/stats-strip';
import { ServiceCards } from '../../shared/components/service-cards/service-cards';
import { SectionItem } from '../../shared/interfaces/service-item.interface';
import { StatItem } from '../../shared/interfaces/stat-item.interface';
import { ClientItem } from '../../shared/interfaces/client-item.interface';

@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterLink, Navbar, MainFooter, StatsStrip, ServiceCards],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  stats: StatItem[] = [
    { id: 1, label: 'Años de experiencia', value: 20, suffix: '+' },
    { id: 2, label: 'Km recorridos', value: 150000, suffix: '+' },
    { id: 3, label: 'Maniobras realizadas', value: 2800, suffix: '+' },
    { id: 4, label: 'Operación', display: '24/7' }
  ];

  clients: ClientItem[] = [
    { id: 1, name: 'Halliburton', image: 'images/clients/halliburton.png' },
    { id: 2, name: 'Baker Hughes', image: 'images/clients/baker-hughes.png' },
    { id: 3, name: 'Instituto Mexicano del Petróleo', image: 'images/clients/imp.png' },
    { id: 4, name: 'Latina', image: 'images/clients/latina.png' },
    { id: 5, name: 'Jaguar Exploración y Producción', image: 'images/clients/jaguar.png' },
    { id: 6, name: 'Diavaz', image: 'images/clients/diavaz.png' }
  ];

  services: SectionItem[] = [
    {
      id: 1,
      title: 'Carga general y especializada',
      description: 'Plataformas, cama baja y lowboy para cargas de gran peso y dimensión.',
      image: 'images/fleet/svc-carga.jpg',
      route: '/servicios'
    },
    {
      id: 2,
      title: 'Izajes con grúa articulada',
      description: 'Grúas certificadas de 6 a 12 toneladas para maniobras en sitio.',
      image: 'images/fleet/svc-izaje.jpg',
      route: '/servicios'
    },
    {
      id: 3,
      title: 'Materiales y residuos peligrosos',
      description: 'Permisos vigentes SCT y SEMARNAT para el sector hidrocarburos.',
      image: 'images/fleet/svc-hazmat.jpg',
      route: '/servicios'
    },
    {
      id: 4,
      title: 'Suministro de agua',
      description: 'Pipas de 40 y 45 m³ con permiso vigente ante CONAGUA.',
      image: 'images/fleet/svc-agua.jpg',
      route: '/servicios'
    }
  ];
}
