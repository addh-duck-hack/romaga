import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MainCarousel } from 'src/app/shared/components/main-carousel/main-carousel';
import { SectionItem } from 'src/app/shared/interfaces/section-separator.interface';
import { SectionSeparator } from 'src/app/shared/components/section-separator/section-separator';
import { BlankSeparator } from 'src/app/shared/components/blank-separator/blank-separator';
import { ServiceCards } from 'src/app/shared/components/service-cards/service-cards';

@Component({
  selector: 'home',
  imports: [Navbar, MainCarousel, SectionSeparator, BlankSeparator, ServiceCards],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  separator1:SectionItem = {
    id: 0,
    title: 'Experiencia',
    description: 'Por más de 20 años Transportes ROMAGA, se ha desarrollado en la industria del transporte de carga federal, brindando sus servicios en diferentes partes de la República Mexicana.\n Se ha consolidado en el estado de Veracruz, enfatizando su experiencia en el servicio de transporte a empresas del ramo petrolero, por más de 15 años.',
    image: 'images/photo_9.png',
    route: '/section1'
  };

  cardsServices:SectionItem[] = [
    {
      id: 0,
      title: 'Experiencia',
      description: 'Por más de 20 años Transportes ROMAGA, se ha desarrollado en la industria del transporte de carga federal, brindando sus servicios en diferentes partes de la República Mexicana.\n Se ha consolidado en el estado de Veracruz, enfatizando su experiencia en el servicio de transporte a empresas del ramo petrolero, por más de 15 años.',
      image: 'images/photo_9.png',
      route: '/section1'
    },
    {
      id: 1,
      title: 'Experiencia 2',
      description: 'Por más de 20 años Transportes ROMAGA, se ha desarrollado en la industria del transporte de carga federal, brindando sus servicios en diferentes partes de la República Mexicana.\n Se ha consolidado en el estado de Veracruz, enfatizando su experiencia en el servicio de transporte a empresas del ramo petrolero, por más de 15 años.',
      image: 'images/photo_3.png',
      route: '/section1'
    },
    {
      id: 3,
      title: 'Excelencia',
      description: 'Por más de 20 años Transportes ROMAGA, se ha desarrollado en la industria del transporte de carga federal, brindando sus servicios en diferentes partes de la República Mexicana.\n Se ha consolidado en el estado de Veracruz, enfatizando su experiencia en el servicio de transporte a empresas del ramo petrolero, por más de 15 años.',
      image: 'images/photo_5.png',
      route: '/section1'
    }
  ];
}
