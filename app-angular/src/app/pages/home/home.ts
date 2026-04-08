import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { MainCarousel } from 'src/app/shared/components/main-carousel/main-carousel';
import { SectionSeparatorItem } from 'src/app/shared/interfaces/section-separator.interface';
import { SectionSeparator } from 'src/app/shared/components/section-separator/section-separator';

@Component({
  selector: 'home',
  imports: [Navbar, MainCarousel, SectionSeparator],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  separator1:SectionSeparatorItem = {
    id: 0,
    title: 'Section 1',
    description: 'Description for Section 1',
    image: 'images/separator1.png',
    route: '/section1'
  }

}
