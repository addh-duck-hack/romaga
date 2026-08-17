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
      { id: 1, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/527828861249', newPage: true },
      { id: 2, name: 'Facebook', icon: 'fa-brands fa-facebook', url: 'https://facebook.com/romaga', newPage: true }
    ]);
  }
}
