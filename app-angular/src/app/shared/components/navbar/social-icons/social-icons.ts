import { Component } from '@angular/core';
import { SocialItem } from 'src/app/shared/interfaces/social-item.interface';

@Component({
  selector: 'social-icons',
  imports: [],
  templateUrl: './social-icons.html',
  styleUrl: './social-icons.css'
})
export class SocialIcons {
  socialItems:SocialItem[] = [
    { id: 1, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: 'https://wa.me/7717742823', newPage: true },
    { id: 2, name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/romaga', newPage: true },
    { id: 3, name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/romaga', newPage: true },
    { id: 4, name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/romaga', newPage: true },
    { id: 5, name: 'Login', icon: 'fa-solid fa-user', url: '/login', newPage: false }
  ]
}
