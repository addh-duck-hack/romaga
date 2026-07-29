import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from 'src/app/shared/components/navbar/navbar';
import { MainFooter } from 'src/app/shared/components/main-footer/main-footer';
import { ServiceDetail } from 'src/app/shared/interfaces/service-detail.interface';

interface EquipmentRow {
  name: string;
  spec: string;
}

@Component({
  selector: 'app-services',
  imports: [RouterLink, Navbar, MainFooter],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export default class Services {
  serviceDetails: ServiceDetail[] = [
    {
      id: 1,
      index: '01',
      title: 'Transporte federal de carga general y especializada',
      description: 'Movemos mercancía general y equipo de alta especialización con plataformas sencillas y full, cama baja y lowboy, para cargas de gran peso y dimensión en toda la República Mexicana.',
      image: 'images/fleet/svc-carga.jpg',
      specs: ['Plataforma sencilla y full', 'Cama baja petrolera', 'Lowboy', 'Multimodal'],
      cta: 'Cotizar transporte de carga'
    },
    {
      id: 2,
      index: '02',
      title: 'Maniobras de izaje en sitio',
      description: 'Grúas articuladas certificadas para maniobras de carga y descarga en sitio, con capacidad para distintos pesos y tractocamiones equipados con winch para maniobras de arrastre.',
      image: 'images/fleet/svc-izaje.jpg',
      specs: ['Grúa 6–12 ton', 'Winch 30–60 ton', 'Certificada'],
      cta: 'Cotizar maniobra'
    },
    {
      id: 3,
      index: '03',
      title: 'Transporte de materiales y residuos peligrosos',
      description: 'Unidades de presión y vacío y tolva neumática para el manejo de materiales y residuos peligrosos, con permisos vigentes ante SCT y SEMARNAT y personal capacitado para el sector hidrocarburos.',
      image: 'images/fleet/svc-hazmat.jpg',
      specs: ['UPV 20–30 m³', 'Acero inoxidable', 'Tolva neumática 35 ton', 'Permiso SCT / SEMARNAT'],
      cta: 'Cotizar servicio'
    },
    {
      id: 4,
      index: '04',
      title: 'Suministro y transporte de agua en pipa',
      description: 'Tanques pipa para suministro de agua en obra, industria y sector petrolero, con área propia de llenado y permiso vigente ante CONAGUA.',
      image: 'images/fleet/svc-agua.jpg',
      specs: ['Pipa 40 m³', 'Pipa 45 m³', 'Permiso CONAGUA'],
      cta: 'Cotizar servicio de agua'
    }
  ];

  equipmentLeft: EquipmentRow[] = [
    { name: 'Tractocamión 5ta rueda', spec: 'Flotilla propia' },
    { name: 'Tractocamión con winch', spec: '30 y 60 ton' },
    { name: 'Grúa articulada certificada', spec: '6–12 ton' },
    { name: 'Tanque pipa para agua', spec: '40–45 m³' },
    { name: 'Unidad de presión y vacío', spec: '20–30 m³' }
  ];

  equipmentRight: EquipmentRow[] = [
    { name: 'UPV acero inoxidable', spec: '30 m³' },
    { name: 'Tolva neumática', spec: '35 ton' },
    { name: 'Remolque plataforma sencilla y full', spec: 'Multimodal' },
    { name: 'Cama baja petrolera / Lowboy', spec: 'Carga especializada' },
    { name: 'Rastreo satelital en todas las unidades', spec: '24/7' }
  ];
}
