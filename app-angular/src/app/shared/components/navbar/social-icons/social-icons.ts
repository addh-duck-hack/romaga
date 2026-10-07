import { Component, signal } from '@angular/core';
import { SocialItem } from 'src/app/shared/interfaces/social-item.interface';

@Component({
  selector: 'social-icons',
  imports: [],
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.css'
})
export class SocialIcons {
  socialItems = signal<SocialItem[]>([]);

  constructor(){
    this.socialItems.set([
      { id: 1, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/5217821035684?text=Hola,%20estoy%20visitando%20su%20sitio%20web%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.', newPage: true },
      { id: 2, name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://facebook.com/romaga', newPage: true }
    ]);
  }
}
