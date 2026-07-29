import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from 'src/app/shared/components/navbar/navbar';
import { MainFooter } from 'src/app/shared/components/main-footer/main-footer';
import { StatsStrip } from 'src/app/shared/components/stats-strip/stats-strip';
import { StatItem } from 'src/app/shared/interfaces/stat-item.interface';

interface Certification {
  title: string;
  description: string;
}

interface InfraItem {
  title: string;
  description: string;
}

@Component({
  selector: 'about-us',
  imports: [RouterLink, Navbar, MainFooter, StatsStrip],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export default class AboutUs {
  stats: StatItem[] = [
    { id: 1, label: 'Años de experiencia', display: '20+' },
    { id: 2, label: 'Años en sector petrolero', display: '15+' },
    { id: 3, label: 'Líneas de equipo especializado', display: '6' },
    { id: 4, label: 'Operación', display: '24/7' }
  ];

  certifications: Certification[] = [
    { title: 'Equipos certificados EMA', description: 'Equipos de medición y control certificados por la Entidad Mexicana de Acreditación.' },
    { title: 'Personal capacitado PEMEX', description: 'Personal capacitado para trabajo en locaciones de Pemex y del sector hidrocarburos.' },
    { title: 'Sistemas de gestión SSMA', description: 'Gestión de seguridad, salud y medio ambiente en todas las operaciones.' },
    { title: 'Servicio 24/7/365', description: 'Disponibilidad los 365 días del año, las 24 horas del día.' },
    { title: 'Unidades aseguradas', description: 'Cobertura de responsabilidad civil ecológica en toda la flotilla.' },
    { title: 'Rastreo satelital', description: 'Unidades monitoreadas por rastreo satelital en tiempo real.' }
  ];

  infra: InfraItem[] = [
    { title: 'Oficinas administrativas', description: 'Gestión y coordinación de operaciones.' },
    { title: 'Patio de maniobras', description: 'Espacio para carga, descarga y resguardo de unidades.' },
    { title: 'Área de mantenimiento', description: 'Mantenimiento propio de la flotilla.' },
    { title: 'Área de llenado de pipas', description: 'Abastecimiento para el servicio de suministro de agua.' }
  ];
}
